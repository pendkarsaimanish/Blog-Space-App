import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    RefreshControl,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS, FONT_SIZES, SPACING } from '../constants/theme';
import { BlogCard } from '../components/BlogCard';
import { BlogPost } from '../types';
import { databases, DATABASE_ID, POSTS_COLLECTION_ID } from '../services/appwrite';
import { Query } from 'appwrite';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface HomeScreenProps {
    navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const { isAuthenticated } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await databases.listDocuments(
                DATABASE_ID,
                POSTS_COLLECTION_ID,
                [Query.orderDesc('$createdAt'), Query.limit(20)]
            );

            const formattedPosts: BlogPost[] = response.documents.map((doc: any) => ({
                $id: doc.$id,
                title: doc.title,
                content: doc.content,
                author: {
                    $id: doc.author.$id,
                    email: doc.author.email,
                    name: doc.author.name,
                    bio: doc.author.bio,
                    avatar: doc.author.avatar,
                    createdAt: doc.author.$createdAt,
                },
                tags: doc.tags || [],
                createdAt: doc.$createdAt,
                updatedAt: doc.$updatedAt,
                readTime: doc.readTime,
            }));

            setPosts(formattedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchPosts();
        setRefreshing(false);
    };

    const filteredPosts = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handlePostPress = (post: BlogPost) => {
        navigation.navigate('BlogDetails', { post });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>B</Text>
                        </View>
                        <Text style={styles.logoTitle}>BlogSpace</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.themeToggle}
                        onPress={toggleTheme}
                    >
                        <Ionicons
                            name={isDarkMode ? "sunny-outline" : "moon-outline"}
                            size={24}
                            color={COLORS.textPrimary}
                        />
                    </TouchableOpacity>
                </View>

                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <Text style={styles.heroTitle}>
                        Welcome to <Text style={styles.heroTitleAccent}>BlogSpace</Text>
                    </Text>
                    <Text style={styles.heroSubtitle}>
                        Discover amazing stories, insights, and ideas from our community of writers.
                        Share your thoughts and connect with like-minded individuals.
                    </Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color={COLORS.textSecondary} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search blogs..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor={COLORS.textTertiary}
                        />
                    </View>
                </View>

                {/* Latest Posts Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Latest Posts</Text>
                        <TouchableOpacity onPress={() => {
                            // TODO: Implement search functionality
                            console.log('Search functionality coming soon');
                        }}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <Text style={styles.loadingText}>Loading posts...</Text>
                        </View>
                    ) : filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <BlogCard
                                key={post.$id}
                                post={post}
                                onPress={() => handlePostPress(post)}
                            />
                        ))
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="document-outline" size={48} color={COLORS.textSecondary} />
                            <Text style={styles.emptyText}>
                                {searchQuery ? 'No posts found for your search.' : 'No posts available yet.'}
                            </Text>
                        </View>
                    )}
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
        justifyContent: 'space-between',
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

    themeToggle: {
        padding: SPACING.sm,
        marginLeft: SPACING.xs,
    },
    heroSection: {
        paddingHorizontal: SPACING.base,
        paddingBottom: SPACING.lg,
    },
    heroTitle: {
        fontSize: FONT_SIZES['3xl'],
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
        lineHeight: FONT_SIZES['3xl'] * 1.2,
    },
    heroTitleAccent: {
        color: COLORS.primary,
    },
    heroSubtitle: {
        fontSize: FONT_SIZES.base,
        color: COLORS.textSecondary,
        lineHeight: FONT_SIZES.base * 1.4,
    },
    searchContainer: {
        paddingHorizontal: SPACING.base,
        marginBottom: SPACING.lg,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radiusLg,
        paddingHorizontal: SPACING.base,
        paddingVertical: SPACING.sm,
        minHeight: 48,
        ...SHADOWS.sm,
    },
    searchInput: {
        flex: 1,
        marginLeft: SPACING.sm,
        fontSize: FONT_SIZES.base,
        color: COLORS.textPrimary,
    },
    section: {
        paddingHorizontal: SPACING.base,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.base,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    seeAllText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.primary,
        fontWeight: '600',
    },
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: SPACING['2xl'],
    },
    loadingText: {
        fontSize: FONT_SIZES.base,
        color: COLORS.textSecondary,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: SPACING['2xl'],
    },
    emptyText: {
        fontSize: FONT_SIZES.base,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: SPACING.base,
    },
});
