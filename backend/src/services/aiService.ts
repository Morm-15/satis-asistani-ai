// backend/src/services/aiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error("❌ GEMINI_API_KEY is missing in .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

// دالة لتجهيز الملف وتصحيح نوعه
function fileToGenerativePart(path: string, mimeType: string) {
    // 👇 الإصلاح السحري: جوجل يكره "image/jpg" ويحب "image/jpeg"
    if (mimeType === 'image/jpg') {
        mimeType = 'image/jpeg';
    }

    return {
        inlineData: {
            data: fs.readFileSync(path).toString("base64"),
            mimeType, // الآن أصبح يرسل النوع الصحيح دائماً
        },
    };
}

export const analyzeImage = async (imagePath: string, mimeType: string) => {
    try {
        // الموديل الذي نجحنا في الاتصال به (gemini-flash-latest)
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
      You are an expert product appraiser. Analyze this image and return a JSON object ONLY.
      Do not include "json" or backticks.
      
      Required JSON Structure:
      {
        "productName": "Detailed Name",
        "description": "Attractive sales description (2-3 lines)",
        "estimatedPrice": {
          "min": 100,
          "max": 200,
          "currency": "USD"
        },
        "sellingTips": ["Tip 1", "Tip 2", "Tip 3"]
      }
    `;

        const imagePart = fileToGenerativePart(imagePath, mimeType);

        console.log(`🤖 Asking Gemini (Flash Latest) with mime: ${imagePart.inlineData.mimeType}...`);

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // تنظيف النتيجة
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanText);

    } catch (error) {
        console.error("❌ AI Service Error:", error);
        throw new Error("Failed to analyze image with AI");
    }
};