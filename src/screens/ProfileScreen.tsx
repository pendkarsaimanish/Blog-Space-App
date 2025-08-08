import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { databases, DATABASE_ID, USERS_COLLECTION_ID } from '../services/appwrite';

interface ProfileScreenProps {
    navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        bio: user?.prefs?.bio || '',
        email: user?.email || '',
    });

    const handleSave = async () => {
        if (!formData.name.trim()) {
            Alert.alert('Error', 'Name is required');
            return;
        }

        try {
            setLoading(true);
            await databases.updateDocument(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                user?.$id || '',
                {
                    name: formData.name.trim(),
                    bio: formData.bio.trim(),
                }
            );

            Alert.alert('Success', 'Profile updated successfully!');
            setIsEditing(false);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            bio: user?.prefs?.bio || '',
            email: user?.email || '',
        });
        setIsEditing(false);
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: logout,
                },
            ]
        );
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
                    <Text style={styles.headerTitle}>Profile</Text>
                    <View style={styles.headerActions}>
                        {isEditing ? (
                            <>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={handleCancel}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={handleSave}
                                    disabled={loading}
                                >
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => setIsEditing(true)}
                            >
                                <Ionicons name="pencil" size={20} color={COLORS.primary} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            {user?.prefs?.avatar ? (
                                <Image source={{ uri: user?.prefs?.avatar }} style={styles.avatar} />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <Text style={styles.avatarText}>
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </Text>
                                </View>
                            )}
                            {isEditing && (
                                <TouchableOpacity style={styles.cameraButton}>
                                    <Ionicons name="camera" size={16} color={COLORS.surface} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <View style={styles.profileContent}>
                        <View style={styles.formSection}>
                            <Input
                                label="Full Name"
                                value={formData.name}
                                onChangeText={(text) => setFormData({ ...formData, name: text })}
                                editable={isEditing}
                                style={styles.input}
                            />

                            <Input
                                label="Bio"
                                value={formData.bio}
                                onChangeText={(text) => setFormData({ ...formData, bio: text })}
                                multiline
                                numberOfLines={3}
                                editable={isEditing}
                                placeholder="Tell us about yourself..."
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.infoSection}>
                            <Text style={styles.infoTitle}>Contact Information</Text>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Email</Text>
                                <Text style={styles.infoValue}>{formData.email}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Joined</Text>
                                <Text style={styles.infoValue}>
                                    {formatDate(user?.$createdAt || '')}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.infoSection}>
                            <Text style={styles.infoTitle}>Password</Text>
                            <View style={styles.passwordItem}>
                                <Text style={styles.infoLabel}>Password</Text>
                                <TouchableOpacity style={styles.changePasswordButton}>
                                    <Text style={styles.changePasswordText}>Change Password</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Actions */}
                <View style={styles.actionsSection}>
                    <Button
                        title="Logout"
                        onPress={handleLogout}
                        variant="outline"
                        style={styles.logoutButton}
                    />
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
    editButton: {
        padding: SIZES.sm,
    },
    cancelButton: {
        paddingHorizontal: SIZES.base,
        paddingVertical: SIZES.sm,
        marginRight: SIZES.sm,
    },
    cancelButtonText: {
        fontSize: SIZES.sm,
        color: COLORS.error,
        fontWeight: '500',
    },
    saveButton: {
        paddingHorizontal: SIZES.base,
        paddingVertical: SIZES.sm,
        backgroundColor: COLORS.success,
        borderRadius: SIZES.base,
    },
    saveButtonText: {
        fontSize: SIZES.sm,
        color: COLORS.surface,
        fontWeight: '600',
    },
    profileCard: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.lg,
        margin: SIZES.base,
        overflow: 'hidden',
        ...SHADOWS.base,
    },
    profileHeader: {
        backgroundColor: COLORS.primary,
        paddingTop: SIZES.xl,
        paddingBottom: SIZES.lg,
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: COLORS.surface,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: COLORS.surface,
    },
    avatarText: {
        color: COLORS.surface,
        fontSize: SIZES['3xl'],
        fontWeight: '700',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.surface,
    },
    profileContent: {
        padding: SIZES.base,
    },
    formSection: {
        marginBottom: SIZES.lg,
    },
    input: {
        marginBottom: SIZES.base,
    },
    infoSection: {
        marginBottom: SIZES.lg,
    },
    infoTitle: {
        fontSize: SIZES.lg,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SIZES.base,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SIZES.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    infoLabel: {
        fontSize: SIZES.base,
        color: COLORS.textSecondary,
    },
    infoValue: {
        fontSize: SIZES.base,
        color: COLORS.textPrimary,
        fontWeight: '500',
    },
    passwordItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SIZES.sm,
    },
    changePasswordButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.base,
        paddingVertical: SIZES.sm,
        borderRadius: SIZES.base,
    },
    changePasswordText: {
        fontSize: SIZES.sm,
        color: COLORS.surface,
        fontWeight: '600',
    },
    actionsSection: {
        padding: SIZES.base,
    },
    logoutButton: {
        borderColor: COLORS.error,
    },
});
