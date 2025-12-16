// mobile/src/services/api.ts
import axios from 'axios';

// الرابط الخاص بـ LocalTunnel
const BASE_URL = 'https://hot-crabs-hope.loca.lt/api/products';

export const analyzeImage = async (imageUri: string) => {
    const formData = new FormData();

    // تجهيز الملف
    const filename = imageUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename || '');
    const type = match ? `image/${match[1]}` : `image`;

    // @ts-ignore
    formData.append('image', { uri: imageUri, name: filename, type });

    try {
        console.log(`📡 Sending image to: ${BASE_URL}/analyze`);

        const response = await axios.post(`${BASE_URL}/analyze`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 👇 هذا هو السطر الأهم لتجاوز شاشة الحماية
                'bypass-tunnel-reminder': 'true',
            },
            timeout: 30000, // مهلة 30 ثانية
        });

        return response.data;
    } catch (error: any) {
        // طباعة تفاصيل الخطأ بشكل واضح
        console.error('❌ API Error Details:', error.response ? error.response.data : error.message);
        throw error;
    }
};