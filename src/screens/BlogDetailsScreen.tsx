import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { BlogPost } from '../types';

interface BlogDetailsScreenProps {
    navigation: any;
    route: {
        params: {
            post: BlogPost;
        };
    };
}

export const BlogDetailsScreen: React.FC<BlogDetailsScreenProps> = ({
    navigation,
    route,
}) => {
    const { post } = route.params;

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
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                </View>

                {/* Blog Post Content */}
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{post.title}</Text>

                    {/* Author and Metadata */}
                    <View style={styles.metadataContainer}>
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
                            <View style={styles.authorInfo}>
                                <Text style={styles.authorName}>{post.author.name}</Text>
                                <Text style={styles.publishDate}>
                                    Published on {formatDate(post.createdAt)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.readTimeContainer}>
                            <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
                            <Text style={styles.readTime}>
                                {post.readTime || calculateReadTime(post.content)} min read
                            </Text>
                        </View>
                    </View>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <View style={styles.tagsContainer}>
                            <Ionicons name="bookmark-outline" size={16} color={COLORS.textSecondary} />
                            <View style={styles.tagsList}>
                                {post.tags.map((tag, index) => (
                                    <View key={index} style={styles.tag}>
                                        <Text style={styles.tagText}>{tag}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Content */}
                    <View style={styles.postContent}>
                        <Text style={styles.contentText}>{post.content}</Text>
                    </View>

                    {/* Author Section */}
                    <View style={styles.authorCard}>
                        <View style={styles.authorCardHeader}>
                            {post.author.avatar ? (
                                <Image source={{ uri: post.author.avatar }} style={styles.authorCardAvatar} />
                            ) : (
                                <View style={styles.authorCardAvatarPlaceholder}>
                                    <Text style={styles.authorCardAvatarText}>
                                        {post.author.name.charAt(0).toUpperCase()}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.authorCardInfo}>
                                <Text style={styles.authorCardName}>{post.author.name}</Text>
                                <Text style={styles.authorCardBio}>
                                    {post.author.bio || 'No bio available'}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.morePostsButton}
                            onPress={() => {
                                // Navigate to user's profile or posts
                                navigation.navigate('PublicProfile', { userId: post.author.$id });
                            }}
                        >
                            <Text style={styles.morePostsButtonText}>More Posts</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Related Posts Section */}
                    <View style={styles.relatedSection}>
                        <Text style={styles.relatedTitle}>More from {post.author.name}</Text>
                        {/* TODO: Implement related posts functionality */}
                        <View style={styles.relatedPlaceholder}>
                            <Ionicons name="document-outline" size={32} color={COLORS.textSecondary} />
                            <Text style={styles.relatedPlaceholderText}>
                                Related posts coming soon...
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.base,
        paddingTop: SIZES.xl,
        paddingBottom: SIZES.base,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.sm,
    },
    backText: {
        fontSize: SIZES.base,
        color: COLORS.textPrimary,
        marginLeft: SIZES.xs,
    },
    contentContainer: {
        padding: SIZES.base,
    },
    title: {
        fontSize: SIZES['3xl'],
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: SIZES.lg,
        lineHeight: 36,
    },
    metadataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.lg,
    },
    authorSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: SIZES.sm,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.sm,
    },
    avatarText: {
        color: COLORS.surface,
        fontSize: SIZES.lg,
        fontWeight: '600',
    },
    authorInfo: {
        flex: 1,
    },
    authorName: {
        fontSize: SIZES.base,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    publishDate: {
        fontSize: SIZES.sm,
        color: COLORS.textSecondary,
    },
    readTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    readTime: {
        fontSize: SIZES.sm,
        color: COLORS.textSecondary,
        marginLeft: SIZES.xs,
    },
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.lg,
    },
    tagsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: SIZES.sm,
    },
    tag: {
        backgroundColor: COLORS.primaryLight,
        paddingHorizontal: SIZES.sm,
        paddingVertical: SIZES.xs,
        borderRadius: SIZES.full,
        marginRight: SIZES.xs,
        marginBottom: SIZES.xs,
    },
    tagText: {
        fontSize: SIZES.xs,
        color: COLORS.primary,
        fontWeight: '500',
    },
    postContent: {
        marginBottom: SIZES['2xl'],
    },
    contentText: {
        fontSize: SIZES.base,
        color: COLORS.textPrimary,
        lineHeight: 24,
    },
    authorCard: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.lg,
        padding: SIZES.base,
        marginBottom: SIZES['2xl'],
        ...SHADOWS.base,
    },
    authorCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    authorCardAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: SIZES.base,
    },
    authorCardAvatarPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.base,
    },
    authorCardAvatarText: {
        color: COLORS.surface,
        fontSize: SIZES.xl,
        fontWeight: '600',
    },
    authorCardInfo: {
        flex: 1,
    },
    authorCardName: {
        fontSize: SIZES.lg,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SIZES.xs,
    },
    authorCardBio: {
        fontSize: SIZES.sm,
        color: COLORS.textSecondary,
        lineHeight: 18,
    },
    morePostsButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SIZES.sm,
        paddingHorizontal: SIZES.lg,
        borderRadius: SIZES.base,
        alignSelf: 'flex-end',
    },
    morePostsButtonText: {
        color: COLORS.surface,
        fontSize: SIZES.sm,
        fontWeight: '600',
    },
    relatedSection: {
        marginBottom: SIZES['2xl'],
    },
    relatedTitle: {
        fontSize: SIZES.xl,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: SIZES.base,
    },
    relatedPlaceholder: {
        alignItems: 'center',
        paddingVertical: SIZES['2xl'],
    },
    relatedPlaceholderText: {
        fontSize: SIZES.base,
        color: COLORS.textSecondary,
        marginTop: SIZES.base,
    },
});
