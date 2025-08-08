import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../constants/theme';

interface AnimatedLogoProps {
    style?: any;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ style }) => {
    const logoTextAnim = useRef(new Animated.Value(-200)).current;
    const logoIconAnim = useRef(new Animated.Value(-100)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate the logo text sliding in from left
        Animated.timing(logoTextAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }).start();

        // Animate the logo icon falling from top
        Animated.timing(logoIconAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
        }).start();

        // Fade in opacity
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: opacityAnim }, style]}>
            <View style={styles.logoContainer}>
                <Animated.View
                    style={[
                        styles.logoIcon,
                        { transform: [{ translateY: logoIconAnim }] }
                    ]}
                >
                    <Text style={styles.logoIconText}>B</Text>
                </Animated.View>
                <Animated.Text
                    style={[
                        styles.logoText,
                        { transform: [{ translateX: logoTextAnim }] }
                    ]}
                >
                    BlogSpace
                </Animated.Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.sm,
    },
    logoIconText: {
        color: COLORS.surface,
        fontSize: FONT_SIZES.xl,
        fontWeight: '700',
    },
    logoText: {
        fontSize: FONT_SIZES['2xl'],
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
});
