// src/services/aiService.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

// تعريف شكل البيانات (Interface) - هذا يجعل الكود آمناً ومفهوماً
export interface AIAnalysisResult {
    productName: string;
    condition: string;
    description: string;
    priceRange: string;
    category: string;
    tags: string[];
}

// تهيئة Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

function fileToGenerativePart(path: string, mimeType: string) {
    return {
        inlineData: {
            data: fs.readFileSync(path).toString('base64'),
            mimeType,
        },
    };
}

export const analyzeImage = async (filePath: string, mimeType: string): Promise<AIAnalysisResult> => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const imagePart = fileToGenerativePart(filePath, mimeType);

        const prompt = `
      You are an expert reseller assistant in Turkey.
      Analyze the provided image of a used item.
      
      Return a STRICT JSON object with the following fields (all text in Turkish):
      - productName: Clear name of the product.
      - condition: Assessment of condition (Yeni, Çok İyi, İyi, Orta).
      - description: A professional, catchy description for selling on apps like Dolap/Sahibinden.
      - priceRange: Estimated price range in Turkish Lira (TRY) (e.g. "500 - 700 TL").
      - category: The best category for this item.
      - tags: Array of 5 relevant hashtags string.

      IMPORTANT: Output ONLY valid JSON. No Markdown formatting, no backticks.
    `;

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // تنظيف النص وتحويله إلى JSON
        const cleanText = text.replace(/```json|```/g, '').trim();
        const jsonResponse: AIAnalysisResult = JSON.parse(cleanText);

        return jsonResponse;

    } catch (error) {
        console.error("AI Service Error:", error);
        throw new Error("Failed to analyze image with AI");
    }
};