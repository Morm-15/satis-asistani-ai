// src/routes/productRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { analyzeProduct } from '../controllers/productController';

const router = Router();

// إعداد Multer باستخدام TypeScript
const upload = multer({
    dest: path.join(__dirname, '../../uploads/')
});

// تعريف الرابط
router.post('/analyze', upload.single('image'), analyzeProduct);

export default router;