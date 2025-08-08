import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS, FONT_SIZES, SPACING } from '../constants/theme';

interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    error?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    multiline?: boolean;
    numberOfLines?: number;
    style?: any;
}

export const Input: React.FC<InputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    error,
    icon,
    multiline = false,
    numberOfLines = 1,
    style,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputStyle = [
        styles.input,
        isFocused && styles.inputFocused,
        error && styles.inputError,
        multiline && styles.inputMultiline,
        style,
    ];

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={20}
                        color={isFocused ? COLORS.primary : COLORS.textSecondary}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={inputStyle}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry && !showPassword}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholderTextColor={COLORS.textTertiary}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={20}
                            color={COLORS.textSecondary}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.base,
    },
    label: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radiusBase,
        borderWidth: 1,
        borderColor: COLORS.border,
        minHeight: 56,
        ...SHADOWS.sm,
    },
    input: {
        flex: 1,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.base,
        fontSize: FONT_SIZES.base,
        color: COLORS.textPrimary,
        minHeight: 48,
    },
    inputFocused: {
        borderColor: COLORS.primary,
    },
    inputError: {
        borderColor: COLORS.error,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    icon: {
        marginLeft: SPACING.lg,
        marginRight: SPACING.sm,
    },
    eyeIcon: {
        padding: SPACING.sm,
    },
    errorText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.error,
        marginTop: SPACING.xs,
    },
});
