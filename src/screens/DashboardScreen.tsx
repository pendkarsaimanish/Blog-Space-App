import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { BlogCard } from '../components/BlogCard';
import { Button } from '../components/Button';
import { BlogPost } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { databases, DATABASE_ID, POSTS_COLLECTION_ID } from '../services/appwrite';
import { Query } from 'appwrite';

interface DashboardScreenProps {
    navigation: any;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
    const { user } = useAuth();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        try {
            setLoading(true);
            const response = await databases.listDocuments(
                DATABASE_ID,
                POSTS_COLLECTION_ID,
                [
                    Query.equal('author.$id', user?.$id || ''),
                    Query.orderDesc('$createdAt'),
                    Query.limit(10),
                ]
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
            console.error('Error fetching user posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchUserPosts();
        setRefreshing(false);
    };

    const handlePostPress = (post: BlogPost) => {
        navigation.navigate('BlogDetails', { post });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
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
                    <TouchableOpacity
                        style={styles.newPostButton}
                        onPress={() => navigation.navigate('NewBlog')}
                    >
                        <Ionicons name="add" size={20} color={COLORS.surface} />
                        <Text style={styles.newPostText}>New Post</Text>
                    </TouchableOpacity>
                </View>

                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeTitle}>
                        Welcome back, {user?.name}! 👋
                    </Text>
                </View>

                {/* Stats Card */}
                <View style={styles.statsCard}>
                    <View style={styles.statsContent}>
                        <Text style={styles.statsNumber}>{posts.length}</Text>
                        <Text style={styles.statsLabel}>Published Posts</Text>
                    </View>
                    <Ionicons name="book-outline" size={32} color={COLORS.primary} />
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionsContainer}>
                        <Button
                            title="Write New Post"
                            onPress={() => navigation.navigate('NewBlog')}
                            icon="add"
                            style={styles.actionButton}
                        />
                        <Button
                            title="Edit Profile"
                            onPress={() => navigation.navigate('Profile')}
                            variant="outline"
                            style={styles.actionButton}
                        />
                    </View>
                </View>

                {/* Recent Posts */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Your Recent Posts</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('NewBlog')}>
                            <Text style={styles.createNewText}>Create New Post →</Text>
                        </TouchableOpacity>
                    </View>

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <Text style={styles.loadingText}>Loading your posts...</Text>
                        </View>
                    ) : posts.length > 0 ? (
                        posts.map((post) => (
                            <BlogCard
                                key={post.$id}
                                post={post}
                                onPress={() => handlePostPress(post)}
                                showAuthor={false}
                            />
                        ))
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="document-outline" size={48} color={COLORS.textSecondary} />
                            <Text style={styles.emptyTitle}>No posts yet</Text>
                            <Text style={styles.emptyText}>
                                Start writing your first blog post to share your thoughts with the world.
                            </Text>
                            <Button
                                title="Write Your First Post"
                                onPress={() => navigation.navigate('NewBlog')}
                                style={styles.emptyButton}
                            />
                        </View>
                    )}
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
        justifyContent: 'space-between',
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
    newPostButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.base,
        paddingVertical: SIZES.sm,
        borderRadius: SIZES.base,
        ...SHADOWS.sm,
    },
    newPostText: {
        color: COLORS.surface,
        fontSize: SIZES.sm,
        fontWeight: '600',
        marginLeft: SIZES.xs,
    },
    welcomeSection: {
        paddingHorizontal: SIZES.base,
        paddingBottom: SIZES.lg,
    },
    welcomeTitle: {
        fontSize: SIZES['2xl'],
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    statsCard: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.lg,
        padding: SIZES.base,
        marginHorizontal: SIZES.base,
        marginBottom: SIZES.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...SHADOWS.base,
    },
    statsContent: {
        flex: 1,
    },
    statsNumber: {
        fontSize: SIZES['3xl'],
        fontWeight: '700',
        color: COLORS.primary,
    },
    statsLabel: {
        fontSize: SIZES.sm,
        color: COLORS.textSecondary,
        marginTop: SIZES.xs,
    },
    section: {
        paddingHorizontal: SIZES.base,
        marginBottom: SIZES.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    sectionTitle: {
        fontSize: SIZES.xl,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    createNewText: {
        fontSize: SIZES.sm,
        color: COLORS.primary,
        fontWeight: '600',
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: SIZES.base,
    },
    actionButton: {
        flex: 1,
    },
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: SIZES['2xl'],
    },
    loadingText: {
        fontSize: SIZES.base,
        color: COLORS.textSecondary,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: SIZES['2xl'],
    },
    emptyTitle: {
        fontSize: SIZES.lg,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginTop: SIZES.base,
        marginBottom: SIZES.sm,
    },
    emptyText: {
        fontSize: SIZES.base,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: SIZES.lg,
        paddingHorizontal: SIZES.base,
    },
    emptyButton: {
        width: '100%',
    },
});
