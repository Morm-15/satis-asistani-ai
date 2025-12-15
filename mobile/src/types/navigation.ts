// mobile/src/types/navigation.ts

export type RootStackParamList = {
    Home: undefined;           // الشاشة الرئيسية
    Camera: undefined;         // شاشة الكاميرا
    Result: { data: any };     // شاشة النتيجة (تمرر لها البيانات)
};