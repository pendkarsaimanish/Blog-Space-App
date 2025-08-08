import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';

// Import screens
import { HomeScreen } from '../screens/HomeScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LoginScreen } from '../screens/LoginScreen';

export type TabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Profile: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomTabNavigator: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Login') {
            iconName = focused ? 'log-in' : 'log-in-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          paddingHorizontal: SPACING.base,
        },
        tabBarLabelStyle: {
          fontSize: FONT_SIZES.xs,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      {isAuthenticated ? (
        <>
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              title: 'Dashboard',
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'Profile',
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Login',
          }}
        />
      )}
    </Tab.Navigator>
  );
};
