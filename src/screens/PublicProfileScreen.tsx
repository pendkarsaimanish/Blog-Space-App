import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { BlogCard } from '../components/BlogCard';
import { BlogPost, User } from '../types';
import { databases, DATABASE_ID, POSTS_COLLECTION_ID, USERS_COLLECTION_ID } from '../services/appwrite';
import { Query } from 'appwrite';

interface PublicProfileScreenProps {
  navigation: any;
  route: any;
}

export const PublicProfileScreen: React.FC<PublicProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const { userId } = route.params;
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch user data
      const userData = await databases.getDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        userId
      );

      const user: User = {
        $id: userData.$id,
        email: userData.email,
        name: userData.name,
        bio: userData.bio,
        avatar: userData.avatar,
        createdAt: userData.$createdAt,
      };

      setUser(user);

      // Fetch user's posts
      const postsData = await databases.listDocuments(
        DATABASE_ID,
        POSTS_COLLECTION_ID,
        [Query.equal('authorId', userId)]
      );

      const userPosts: BlogPost[] = postsData.documents.map((doc: any) => ({
        $id: doc.$id,
        title: doc.title,
        content: doc.content,
        author: user,
        tags: doc.tags || [],
        createdAt: doc.$createdAt,
        updatedAt: doc.$updatedAt,
        readTime: doc.readTime,
      }));

      setPosts(userPosts);
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="person-outline" size={48} color={COLORS.textSecondary} />
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.joinDate}>
                Joined {formatDate(user.createdAt)}
              </Text>
            </View>
          </View>

          {user.bio && (
            <View style={styles.bioSection}>
              <Text style={styles.bioText}>{user.bio}</Text>
            </View>
          )}

          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{posts.length}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        {/* Posts Section */}
        <View style={styles.postsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {posts.length > 0 ? `${user.name}'s Posts` : 'No Posts Yet'}
            </Text>
            <Text style={styles.postsCount}>
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </Text>
          </View>

          {posts.length > 0 ? (
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
                {user.name} hasn't published any posts yet.
              </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: SIZES.base,
    color: COLORS.textSecondary,
    marginTop: SIZES.base,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontSize: SIZES.base,
    color: COLORS.textSecondary,
    marginTop: SIZES.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: SIZES.base,
    color: COLORS.textPrimary,
    marginLeft: SIZES.xs,
  },
  profileSection: {
    padding: SIZES.base,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: SIZES.base,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.base,
  },
  avatarText: {
    color: COLORS.surface,
    fontSize: SIZES['2xl'],
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  joinDate: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  bioSection: {
    marginBottom: SIZES.base,
  },
  bioText: {
    fontSize: SIZES.base,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  statsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.base,
    ...SHADOWS.sm,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  postsSection: {
    padding: SIZES.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  postsCount: {
    fontSize: SIZES.sm,
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
    marginBottom: SIZES.xs,
  },
  emptyText: {
    fontSize: SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SIZES.base,
  },
});
