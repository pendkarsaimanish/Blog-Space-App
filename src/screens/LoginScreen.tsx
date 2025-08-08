import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS, FONT_SIZES, SPACING } from '../constants/theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

interface LoginScreenProps {
    navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            await login(email, password);
            // Navigation will be handled by the auth context
        } catch (error: any) {
            Alert.alert('Login Failed', error.message || 'Please check your credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logo}>
                                <Text style={styles.logoText}>B</Text>
                            </View>
                            <Text style={styles.logoTitle}>BlogSpace</Text>
                        </View>
                    </View>

                    {/* Login Form */}
                    <View style={styles.formContainer}>
                        <View style={styles.iconContainer}>
                            <View style={styles.iconCircle}>
                                <Text style={styles.iconText}>B</Text>
                            </View>
                        </View>

                        <Text style={styles.title}>Welcome back</Text>
                        <Text style={styles.subtitle}>Sign in to your account to continue</Text>

                        <View style={styles.form}>
                            <Input
                                label="Email Address"
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                icon="mail-outline"
                            />

                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                icon="lock-closed-outline"
                            />

                            <Button
                                title="Sign In"
                                onPress={handleLogin}
                                loading={loading}
                                style={styles.loginButton}
                            />

                            <View style={styles.registerContainer}>
                                <Text style={styles.registerText}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text style={styles.registerLink}>Sign up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.base,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.base,
    },

    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 28,
        height: 28,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radiusSm,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.sm,
    },
    logoText: {
        color: COLORS.surface,
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
    },
    logoTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: SPACING.xl,
        paddingBottom: SPACING['2xl'],
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.base,
    },
    iconText: {
        color: COLORS.surface,
        fontSize: FONT_SIZES['3xl'],
        fontWeight: '700',
    },
    title: {
        fontSize: FONT_SIZES['3xl'],
        fontWeight: '700',
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: SPACING.sm,
        lineHeight: FONT_SIZES['3xl'] * 1.2,
    },
    subtitle: {
        fontSize: FONT_SIZES.base,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: SPACING['2xl'],
        lineHeight: FONT_SIZES.base * 1.4,
    },
    form: {
        width: '100%',
    },
    loginButton: {
        marginTop: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        fontSize: FONT_SIZES.base,
        color: COLORS.textSecondary,
    },
    registerLink: {
        fontSize: FONT_SIZES.base,
        color: COLORS.primary,
        fontWeight: '600',
    },
});
