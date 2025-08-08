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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { databases, DATABASE_ID, POSTS_COLLECTION_ID } from '../services/appwrite';
import { ID } from 'appwrite';

interface NewBlogScreenProps {
    navigation: any;
}

export const NewBlogScreen: React.FC<NewBlogScreenProps> = ({ navigation }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Error', 'Please fill in title and content');
            return;
        }

        try {
            setLoading(true);

            const tagArray = tags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);

            const postData = {
                title: title.trim(),
                content: content.trim(),
                tags: tagArray,
                author: user?.$id,
                readTime: Math.ceil(content.split(' ').length / 200), // Calculate read time
            };

            await databases.createDocument(
                DATABASE_ID,
                POSTS_COLLECTION_ID,
                ID.unique(),
                postData
            );

            Alert.alert('Success', 'Your blog post has been published!', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Dashboard'),
                },
            ]);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to publish post');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDraft = () => {
        // TODO: Implement draft saving functionality
        Alert.alert('Info', 'Draft saving feature coming soon!');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>New Post</Text>
                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            style={styles.draftButton}
                            onPress={handleSaveDraft}
                        >
                            <Text style={styles.draftButtonText}>Save Draft</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Form */}
                <View style={styles.formContainer}>
                    <Input
                        label="Title"
                        placeholder="Enter your blog post title"
                        value={title}
                        onChangeText={setTitle}
                        autoCapitalize="sentences"
                        style={styles.titleInput}
                    />

                    <Input
                        label="Content"
                        placeholder="Write your blog post content here..."
                        value={content}
                        onChangeText={setContent}
                        multiline
                        numberOfLines={10}
                        autoCapitalize="sentences"
                        style={styles.contentInput}
                    />

                    <Input
                        label="Tags (comma separated)"
                        placeholder="e.g., React, JavaScript, Web Development"
                        value={tags}
                        onChangeText={setTags}
                        autoCapitalize="none"
                        style={styles.tagsInput}
                    />

                    <View style={styles.publishSection}>
                        <Button
                            title="Publish Post"
                            onPress={handlePublish}
                            loading={loading}
                            style={styles.publishButton}
                        />
                    </View>

                    {/* Preview Section */}
                    {title || content ? (
                        <View style={styles.previewSection}>
                            <Text style={styles.previewTitle}>Preview</Text>
                            <View style={styles.previewCard}>
                                <Text style={styles.previewPostTitle}>
                                    {title || 'Your title will appear here'}
                                </Text>
                                <Text style={styles.previewPostContent} numberOfLines={3}>
                                    {content || 'Your content will appear here'}
                                </Text>
                                {tags && (
                                    <View style={styles.previewTags}>
                                        {tags
                                            .split(',')
                                            .map((tag) => tag.trim())
                                            .filter((tag) => tag.length > 0)
                                            .slice(0, 3)
                                            .map((tag, index) => (
                                                <View key={index} style={styles.previewTag}>
                                                    <Text style={styles.previewTagText}>{tag}</Text>
                                                </View>
                                            ))}
                                    </View>
                                )}
                            </View>
                        </View>
                    ) : null}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        padding: SIZES.sm,
    },
    headerTitle: {
        fontSize: SIZES.lg,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    draftButton: {
        paddingHorizontal: SIZES.base,
        paddingVertical: SIZES.sm,
        borderRadius: SIZES.base,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    draftButtonText: {
        fontSize: SIZES.sm,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    formContainer: {
        padding: SIZES.base,
    },
    titleInput: {
        marginBottom: SIZES.lg,
    },
    contentInput: {
        marginBottom: SIZES.lg,
        minHeight: 200,
    },
    tagsInput: {
        marginBottom: SIZES.xl,
    },
    publishSection: {
        marginBottom: SIZES['2xl'],
    },
    publishButton: {
        width: '100%',
    },
    previewSection: {
        marginTop: SIZES.lg,
    },
    previewTitle: {
        fontSize: SIZES.lg,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SIZES.base,
    },
    previewCard: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.lg,
        padding: SIZES.base,
        ...SHADOWS.sm,
    },
    previewPostTitle: {
        fontSize: SIZES.lg,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: SIZES.sm,
    },
    previewPostContent: {
        fontSize: SIZES.base,
        color: COLORS.textSecondary,
        lineHeight: 20,
        marginBottom: SIZES.base,
    },
    previewTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    previewTag: {
        backgroundColor: COLORS.primaryLight,
        paddingHorizontal: SIZES.sm,
        paddingVertical: SIZES.xs,
        borderRadius: SIZES.full,
        marginRight: SIZES.xs,
        marginBottom: SIZES.xs,
    },
    previewTagText: {
        fontSize: SIZES.xs,
        color: COLORS.primary,
        fontWeight: '500',
    },
});
