import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

// Import screens
import { HomeScreen } from '../screens/HomeScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { NewBlogScreen } from '../screens/NewBlogScreen';

export type DrawerParamList = {
  Home: undefined;
  Dashboard: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
  About: undefined;
  NewBlog: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DrawerNavigator: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const ThemeToggleButton = () => (
    <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
      <Ionicons
        name={isDarkMode ? "sunny-outline" : "moon-outline"}
        size={24}
        color={COLORS.textPrimary}
      />
    </TouchableOpacity>
  );

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.textSecondary,
        drawerStyle: {
          backgroundColor: COLORS.surface,
          width: 280,
        },
        headerStyle: {
          backgroundColor: COLORS.surface,
        },
        headerTintColor: COLORS.textPrimary,
        headerRight: () => <ThemeToggleButton />,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      {isAuthenticated ? (
        <>
          <Drawer.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              title: 'Dashboard',
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? 'grid' : 'grid-outline'} size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="NewBlog"
            component={NewBlogScreen}
            options={{
              title: 'New Blog',
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'Profile',
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Login',
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? 'log-in' : 'log-in-outline'} size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: 'Register',
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? 'person-add' : 'person-add-outline'} size={size} color={color} />
              ),
            }}
          />
        </>
      )}
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  themeToggle: {
    padding: SPACING.sm,
    marginRight: SPACING.sm,
  },
});
