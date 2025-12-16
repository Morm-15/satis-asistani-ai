// mobile/src/screens/CameraScreen.tsx
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { analyzeImage } from '../services/api'; // استدعاء دالة الاتصال بالسيرفر

type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;

export default function CameraScreen() {
    const navigation = useNavigation<CameraScreenNavigationProp>();
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>('back');
    const [isAnalyzing, setIsAnalyzing] = useState(false); // حالة التحميل
    const cameraRef = useRef<CameraView>(null);

    // 1. التأكد من الصلاحيات
    if (!permission) {
        // الصلاحيات لا تزال تحمل
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        // الصلاحيات مرفوضة
        return (
            <View style={styles.container}>
                <Text style={styles.message}>نحتاج إذن الكاميرا لتصوير المنتجات</Text>
                <Button onPress={requestPermission} title="منح الإذن" />
            </View>
        );
    }

    // 2. دالة التقاط الصورة
    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                setIsAnalyzing(true); // بدء التحميل

                // التقاط الصورة
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.5, // تقليل الجودة قليلاً لتسريع الرفع
                    base64: false,
                });

                if (photo?.uri) {
                    console.log('📸 Photo Taken:', photo.uri);

                    // إرسال الصورة للسيرفر
                    const result = await analyzeImage(photo.uri);

                    console.log('✅ Analysis Done:', result);

                    // الانتقال لشاشة النتائج مع البيانات
                    navigation.replace('Result', { data: result.data });
                }

            } catch (error) {
                Alert.alert('خطأ', 'فشل في التقاط الصورة أو تحليلها. تأكد أن السيرفر يعمل.');
                console.error(error);
            } finally {
                setIsAnalyzing(false); // إيقاف التحميل
            }
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                ref={cameraRef}
            >
                {/* طبقة شفافة فوق الكاميرا لعرض الأزرار */}
                <View style={styles.buttonContainer}>

                    {isAnalyzing ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#fff" />
                            <Text style={styles.loadingText}>جاري تحليل المنتج بالذكاء الاصطناعي...</Text>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                            <View style={styles.innerCircle} />
                        </TouchableOpacity>
                    )}

                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: '#fff',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
        alignItems: 'flex-end',
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#fff',
    },
    innerCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        alignItems: 'center',
        marginBottom: 50,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 20,
        borderRadius: 15,
    },
    loadingText: {
        color: '#fff',
        marginTop: 10,
        fontWeight: 'bold',
    }
});