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
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

interface RegisterScreenProps {
    navigation: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();

    const handleRegister = async () => {
        if (!fullName || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        try {
            setLoading(true);
            await register(email, password, fullName);
            // Navigation will be handled by the auth context
        } catch (error: any) {
            Alert.alert('Registration Failed', error.message || 'Please try again');
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
                        {/* Logo removed */}
                    </View>

                    {/* Register Form */}
                    <View style={styles.formContainer}>
                        <View style={styles.iconContainer}>
                            <View style={styles.iconCircle}>
                                <Text style={styles.iconText}>B</Text>
                            </View>
                        </View>

                        <Text style={styles.title}>Create your account</Text>
                        <Text style={styles.subtitle}>Join our community of writers and readers</Text>

                        <View style={styles.form}>
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                                icon="person-outline"
                            />

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

                            <Input
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                                icon="lock-closed-outline"
                            />

                            <Button
                                title="Create Account"
                                onPress={handleRegister}
                                loading={loading}
                                style={styles.registerButton}
                            />

                            <View style={styles.loginContainer}>
                                <Text style={styles.loginText}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.loginLink}>Sign in</Text>
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
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.base,
        paddingTop: SIZES.xl,
        paddingBottom: SIZES.base,
    },

    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 32,
        height: 32,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.sm,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.sm,
    },
    logoText: {
        color: COLORS.surface,
        fontSize: SIZES.lg,
        fontWeight: '700',
    },
    logoTitle: {
        fontSize: SIZES.xl,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: SIZES.xl,
        paddingBottom: SIZES['2xl'],
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: SIZES.xl,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.base,
    },
    iconText: {
        color: COLORS.surface,
        fontSize: SIZES['3xl'],
        fontWeight: '700',
    },
    title: {
        fontSize: SIZES['3xl'],
        fontWeight: '700',
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: SIZES.sm,
    },
    subtitle: {
        fontSize: SIZES.base,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: SIZES['2xl'],
    },
    form: {
        width: '100%',
    },
    registerButton: {
        marginTop: SIZES.lg,
        marginBottom: SIZES.xl,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: SIZES.base,
        color: COLORS.textSecondary,
    },
    loginLink: {
        fontSize: SIZES.base,
        color: COLORS.primary,
        fontWeight: '600',
    },
});
