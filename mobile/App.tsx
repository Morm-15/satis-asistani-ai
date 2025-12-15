// mobile/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';
import HomeScreen from './src/screens/HomeScreen';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

// --- صفحات مؤقتة (سنستبدلها لاحقاً) ---
const CameraPlaceholder = () => (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>📷 شاشة الكاميرا (قريباً)</Text>
    </View>
);

const ResultPlaceholder = () => (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>✨ شاشة النتائج (قريباً)</Text>
    </View>
);
// --------------------------------------

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Camera"
                    component={CameraPlaceholder}
                    options={{ title: 'التقاط صورة' }}
                />

                <Stack.Screen
                    name="Result"
                    component={ResultPlaceholder}
                    options={{ title: 'التحليل' }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}