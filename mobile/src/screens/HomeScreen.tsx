// mobile/src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* الخلفية العلوية الجمالية */}
            <View style={styles.topDecorationCircle} />

            <View style={styles.content}>

                {/* 1. رأس الصفحة مع الأيقونة */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <LinearGradient
                            colors={['#4facfe', '#00f2fe']}
                            style={styles.iconBackground}
                        >
                            <MaterialCommunityIcons name="robot-excited-outline" size={40} color="#fff" />
                        </LinearGradient>
                    </View>
                    <Text style={styles.title}>Satış Asistanı <Text style={styles.aiBadge}>AI</Text></Text>
                    <Text style={styles.subtitle}>
                        مساعدك الشخصي لتقييم المنتجات وبيعها بذكاء اصطناعي متطور.
                    </Text>
                </View>

                {/* 2. مميزات التطبيق (Features Grid) */}
                <View style={styles.featuresContainer}>
                    <View style={styles.featureItem}>
                        <View style={[styles.featureIcon, { backgroundColor: '#e0f7fa' }]}>
                            <MaterialCommunityIcons name="camera-iris" size={24} color="#00bcd4" />
                        </View>
                        <Text style={styles.featureText}>صور المنتج</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        <MaterialCommunityIcons name="arrow-right-thin" size={24} color="#b2bec3" />
                    </View>
                    <View style={styles.featureItem}>
                        <View style={[styles.featureIcon, { backgroundColor: '#f3e5f5' }]}>
                            <MaterialCommunityIcons name="brain" size={24} color="#9c27b0" />
                        </View>
                        <Text style={styles.featureText}>تحليل AI</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        <MaterialCommunityIcons name="arrow-right-thin" size={24} color="#b2bec3" />
                    </View>
                    <View style={styles.featureItem}>
                        <View style={[styles.featureIcon, { backgroundColor: '#e8f5e9' }]}>
                            <MaterialCommunityIcons name="cash-multiple" size={24} color="#4caf50" />
                        </View>
                        <Text style={styles.featureText}>بيع فوراً</Text>
                    </View>
                </View>

                {/* 3. زر الإجراء الرئيسي (Call to Action) */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Camera')}
                        style={styles.shadowButton}
                    >
                        <LinearGradient
                            colors={['#2575fc', '#6a11cb']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonGradient}
                        >
                            <MaterialCommunityIcons name="camera-plus" size={24} color="#fff" style={{ marginRight: 10 }} />
                            <Text style={styles.buttonText}>ابدأ تحليل جديد</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={styles.footerNote}>مدعوم بواسطة Google Gemini 1.5 Flash ⚡</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa', // لون خلفية هادئ جداً وليس أبيض ناصع
    },
    topDecorationCircle: {
        position: 'absolute',
        top: -100,
        right: -50,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(37, 117, 252, 0.05)', // دائرة خلفية شفافة جداً للجمالية
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
    },
    iconContainer: {
        marginBottom: 20,
        shadowColor: '#2575fc',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    iconBackground: {
        width: 80,
        height: 80,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: 10,
        textAlign: 'center',
    },
    aiBadge: {
        color: '#2575fc',
    },
    subtitle: {
        fontSize: 16,
        color: '#636e72',
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: '85%',
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    featureItem: {
        alignItems: 'center',
    },
    featureIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    featureText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2d3436',
    },
    arrowContainer: {
        top: -10, // رفع السهم قليلاً
    },
    footer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    shadowButton: {
        width: '100%',
        shadowColor: '#6a11cb',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 10,
    },
    buttonGradient: {
        flexDirection: 'row',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerNote: {
        marginTop: 20,
        fontSize: 12,
        color: '#b2bec3',
        fontWeight: '500',
    },
});