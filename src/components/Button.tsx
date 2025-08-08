import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SIZES, SHADOWS, FONT_SIZES, SPACING } from '../constants/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    style?: any;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    style,
}) => {
    const buttonStyle = [
        styles.button,
        styles[size],
        styles[variant],
        disabled && styles.disabled,
        style,
    ];

    const textStyle = [
        styles.text,
        styles[`${variant}Text`],
        styles[`${size}Text`],
        disabled && styles.disabledText,
    ];

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.surface} />
            ) : (
                <Text style={textStyle}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: SIZES.radiusBase,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.sm,
    },
    // Size variants
    small: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        minHeight: 36,
    },
    medium: {
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.base,
        minHeight: 48,
    },
    large: {
        paddingHorizontal: SPACING['2xl'],
        paddingVertical: SPACING.lg,
        minHeight: 56,
    },
    // Variant styles
    primary: {
        backgroundColor: COLORS.primary,
    },
    secondary: {
        backgroundColor: COLORS.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    // Text styles
    text: {
        fontWeight: '600',
    },
    primaryText: {
        color: COLORS.surface,
    },
    secondaryText: {
        color: COLORS.surface,
    },
    outlineText: {
        color: COLORS.primary,
    },
    // Size text styles
    smallText: {
        fontSize: FONT_SIZES.sm,
    },
    mediumText: {
        fontSize: FONT_SIZES.base,
    },
    largeText: {
        fontSize: FONT_SIZES.lg,
    },
    // Disabled styles
    disabled: {
        opacity: 0.5,
    },
    disabledText: {
        opacity: 0.7,
    },
});
