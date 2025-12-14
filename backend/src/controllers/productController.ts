// src/controllers/productController.ts
import { Request, Response } from 'express';
import { analyzeImage } from '../services/aiService';
import fs from 'fs';

export const analyzeProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        // TypeScript قد يشتكي إذا لم نتأكد من وجود الملف
        if (!req.file) {
            res.status(400).json({ success: false, message: 'No image uploaded' });
            return;
        }

        // استدعاء الخدمة
        const analysisResult = await analyzeImage(req.file.path, req.file.mimetype);

        // تنظيف الملف
        fs.unlinkSync(req.file.path);

        // إرسال الرد
        res.status(200).json({
            success: true,
            data: analysisResult
        });

    } catch (error: any) {
        // تنظيف الملف في حال الخطأ
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};