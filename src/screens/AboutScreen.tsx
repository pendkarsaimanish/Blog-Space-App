import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS, FONT_SIZES, SPACING } from '../constants/theme';

interface AboutScreenProps {
    navigation: any;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ navigation }) => {
    const features = [
        {
            icon: 'people-outline',
            title: 'Community Driven',
            description: 'Connect with writers and readers from around the world. Share your stories and discover new perspectives.',
        },
        {
            icon: 'book-outline',
            title: 'Quality Content',
            description: 'We believe in the power of well-crafted stories. Our platform encourages thoughtful, engaging content.',
        },
        {
            icon: 'heart-outline',
            title: 'Passion for Writing',
            description: 'Whether you\'re a seasoned writer or just starting, BlogSpace provides the tools and community to grow.',
        },
        {
            icon: 'megaphone-outline',
            title: 'Your Voice Matters',
            description: 'Every story has value. We provide a platform where your unique voice can be heard and appreciated.',
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    {/* Logo removed */}
                </View>

                {/* About Section */}
                <View style={styles.aboutSection}>
                    <Text style={styles.aboutTitle}>About BlogSpace</Text>
                    <Text style={styles.aboutDescription}>
                        BlogSpace is a modern blogging platform designed for writers who want to share their stories with the world.
                        We believe that everyone has a story worth telling, and we're here to help you tell it.
                    </Text>
                </View>

                {/* Features Section */}
                <View style={styles.featuresSection}>
                    <Text style={styles.featuresTitle}>What We Offer</Text>
                    {features.map((feature, index) => (
                        <View key={index} style={styles.featureCard}>
                            <View style={styles.featureIcon}>
                                <Ionicons name={feature.icon as any} size={24} color={COLORS.primary} />
                            </View>
                            <View style={styles.featureContent}>
                                <Text style={styles.featureTitle}>{feature.title}</Text>
                                <Text style={styles.featureDescription}>{feature.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Contact Section */}
                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Get in Touch</Text>
                    <Text style={styles.contactDescription}>
                        Have questions or suggestions? We'd love to hear from you!
                    </Text>

                    <View style={styles.contactButtons}>
                        <TouchableOpacity style={styles.contactButton}>
                            <Ionicons name="mail-outline" size={20} color={COLORS.primary} />
                            <Text style={styles.contactButtonText}>Email Us</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contactButton}>
                            <Ionicons name="logo-github" size={20} color={COLORS.primary} />
                            <Text style={styles.contactButtonText}>GitHub</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Made with ❤️ by the BlogSpace team
                    </Text>
                    <Text style={styles.versionText}>Version 1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: SPACING.xl,
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
    aboutSection: {
        paddingHorizontal: SPACING.base,
        paddingBottom: SPACING['2xl'],
    },
    aboutTitle: {
        fontSize: FONT_SIZES['2xl'],
        fontWeight: '700',
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: SPACING.lg,
        lineHeight: FONT_SIZES['2xl'] * 1.2,
    },
    aboutDescription: {
        fontSize: FONT_SIZES.base,
        color: COLORS.textSecondary,
        lineHeight: FONT_SIZES.base * 1.4,
        textAlign: 'center',
    },
    featuresSection: {
        paddingHorizontal: SIZES.base,
        paddingBottom: SIZES['2xl'],
    },
    featuresTitle: {
        fontSize: SIZES.xl,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: SIZES.lg,
    },
    featureCard: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.lg,
        padding: SIZES.base,
        marginBottom: SIZES.base,
        flexDirection: 'row',
        alignItems: 'flex-start',
        ...SHADOWS.sm,
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.base,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: SIZES.lg,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SIZES.xs,
    },
    featureDescription: {
        fontSize: SIZES.sm,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
    contactSection: {
        paddingHorizontal: SIZES.base,
        paddingBottom: SIZES['2xl'],
    },
    contactTitle: {
        fontSize: SIZES.xl,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: SIZES.sm,
    },
    contactDescription: {
        fontSize: SIZES.base,
        color: COLORS.textSecondary,
        marginBottom: SIZES.lg,
    },
    contactButtons: {
        flexDirection: 'row',
        gap: SIZES.base,
    },
    contactButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.surface,
        paddingVertical: SIZES.base,
        paddingHorizontal: SIZES.lg,
        borderRadius: SIZES.base,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...SHADOWS.sm,
    },
    contactButtonText: {
        fontSize: SIZES.sm,
        color: COLORS.primary,
        fontWeight: '600',
        marginLeft: SIZES.xs,
    },
    footer: {
        paddingHorizontal: SIZES.base,
        paddingBottom: SIZES['2xl'],
        alignItems: 'center',
    },
    footerText: {
        fontSize: SIZES.sm,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: SIZES.xs,
    },
    versionText: {
        fontSize: SIZES.xs,
        color: COLORS.textTertiary,
    },
});
