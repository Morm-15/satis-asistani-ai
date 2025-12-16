// mobile/src/screens/ResultScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

export default function ResultScreen() {
    const route = useRoute<ResultScreenRouteProp>();
    const navigation = useNavigation<any>();
    const { data } = route.params; // البيانات القادمة من Gemini

    // دالة لمشاركة الإعلان
    const shareAd = async () => {
        try {
            const message = `${data.productName}\n\n${data.description}\n\nالسعر المقترح: ${data.estimatedPrice.min} - ${data.estimatedPrice.max} ${data.estimatedPrice.currency}`;
            await Share.share({ message });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.label}>اسم المنتج:</Text>
                <Text style={styles.title}>{data.productName}</Text>

                <View style={styles.priceTag}>
                    <Text style={styles.priceLabel}>السعر المقترح</Text>
                    <Text style={styles.price}>
                        {data.estimatedPrice.min} - {data.estimatedPrice.max} {data.estimatedPrice.currency}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>الوصف الإعلاني:</Text>
                    <Text style={styles.description}>{data.description}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>نصائح للبيع:</Text>
                    {data.sellingTips.map((tip: string, index: number) => (
                        <Text key={index} style={styles.tip}>• {tip}</Text>
                    ))}
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.shareButton} onPress={shareAd}>
                    <Text style={styles.buttonText}>📤 مشاركة الإعلان</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.homeButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.homeButtonText}>🏠 الرئيسية</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    label: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    priceTag: {
        backgroundColor: '#e3f2fd',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    priceLabel: {
        color: '#1976d2',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0d47a1',
    },
    section: {
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
    },
    tip: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    actions: {
        gap: 10,
        marginBottom: 40,
    },
    shareButton: {
        backgroundColor: '#2ecc71',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    homeButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    homeButtonText: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 16,
    }
});