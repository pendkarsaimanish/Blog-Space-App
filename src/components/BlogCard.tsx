import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS, FONT_SIZES, SPACING } from '../constants/theme';
import { BlogPost } from '../types';

interface BlogCardProps {
    post: BlogPost;
    onPress: () => void;
    showAuthor?: boolean;
    style?: any;
}

export const BlogCard: React.FC<BlogCardProps> = ({
    post,
    onPress,
    showAuthor = true,
    style,
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const calculateReadTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.split(' ').length;
        return Math.ceil(words / wordsPerMinute);
    };

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={2}>
                        {post.title}
                    </Text>
                    <Text style={styles.content} numberOfLines={3}>
                        {post.content}
                    </Text>
                </View>

                <View style={styles.footer}>
                    {showAuthor && (
                        <View style={styles.authorSection}>
                            {post.author.avatar ? (
                                <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <Text style={styles.avatarText}>
                                        {post.author.name.charAt(0).toUpperCase()}
                                    </Text>
                                </View>
                            )}
                            <Text style={styles.authorName}>{post.author.name}</Text>
                        </View>
                    )}

                    <View style={styles.metadata}>
                        <View style={styles.metadataItem}>
                            <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
                            <Text style={styles.metadataText}>{formatDate(post.createdAt)}</Text>
                        </View>
                        <View style={styles.metadataItem}>
                            <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
                            <Text style={styles.metadataText}>
                                {post.readTime || calculateReadTime(post.content)} min read
                            </Text>
                        </View>
                    </View>
                </View>

                {post.tags && post.tags.length > 0 && (
                    <View style={styles.tagsContainer}>
                        {post.tags.slice(0, 3).map((tag, index) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                        {post.tags.length > 3 && (
                            <Text style={styles.moreTags}>+{post.tags.length - 3}</Text>
                        )}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.base,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radiusLg,
        padding: SPACING.base,
        ...SHADOWS.base,
    },
    header: {
        marginBottom: SPACING.base,
    },
    title: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
        lineHeight: FONT_SIZES.lg * 1.3,
    },
    content: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        lineHeight: FONT_SIZES.sm * 1.4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    authorSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: SPACING.xs,
    },
    avatarPlaceholder: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.xs,
    },
    avatarText: {
        color: COLORS.surface,
        fontSize: FONT_SIZES.xs,
        fontWeight: '600',
    },
    authorName: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    metadata: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metadataItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: SPACING.sm,
    },
    metadataText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textSecondary,
        marginLeft: SPACING.xs,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    tag: {
        backgroundColor: COLORS.primaryLight,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: SIZES.radiusFull,
        marginRight: SPACING.xs,
        marginBottom: SPACING.xs,
    },
    tagText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.primary,
        fontWeight: '500',
    },
    moreTags: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textSecondary,
        marginLeft: SPACING.xs,
    },
});
