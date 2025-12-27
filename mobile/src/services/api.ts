// mobile/src/services/api.ts
import axios from 'axios';

// ⚠️ استبدل الرقم أدناه برقم الـ IP الذي ظهر لك في ipconfig
const YOUR_IP = '192.168.1.103' +
    '';

// لاحظ أننا نستخدم http وليس https
const BASE_URL = `http://${YOUR_IP}:3000/api/products`;

export const analyzeImage = async (imageUri: string) => {
    const formData = new FormData();

    const filename = imageUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename || '');
    const type = match ? `image/${match[1]}` : `image`;

    // @ts-ignore
    formData.append('image', { uri: imageUri, name: filename, type });

    try {
        console.log(`📡 Connecting to: ${BASE_URL}/analyze`);

        // إزالة أي Headers غريبة، فقط نحتاج Content-Type
        const response = await axios.post(`${BASE_URL}/analyze`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 10000,
        });

        return response.data;
    } catch (error: any) {
        console.error('❌ Connection Failed:', error.message);
        if(error.response) console.error('Server Error:', error.response.data);
        throw error;
    }
};