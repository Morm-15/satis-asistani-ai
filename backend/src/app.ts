// backend/src/app.ts

import dotenv from 'dotenv';
// تحميل المتغيرات البيئية فوراً في البداية
dotenv.config();

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

// إنشاء تطبيق Express
const app: Application = express();

// --- Middlewares ---
// السماح بالتواصل من أي مكان (مؤقتاً للتطوير)
app.use(cors());
// السماح بقراءة بيانات JSON
app.use(express.json());

// --- Routes (المسارات) ---
// ربط مسار المنتجات بالراوتر الذي أنشأناه
app.use('/api/products', productRoutes);

// --- فحص صحة السيرفر (Health Check) ---
// هذا الرابط لنعرف أن السيرفر يعمل عند فتح المتصفح
app.get('/', (req: Request, res: Response) => {
    res.send('✅ Satış Asistanı AI Backend is Running Successfully!');
});

// --- تشغيل السيرفر ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`\n🚀 Server is running on: http://localhost:${PORT}`);
    console.log(`👉 Test endpoint: http://localhost:${PORT}/api/products/analyze\n`);
});