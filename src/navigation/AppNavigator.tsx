import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { LoadingScreen } from '../components/LoadingScreen';

// Import navigators
import { DrawerNavigator } from './DrawerNavigator';

// Import screens
import { BlogDetailsScreen } from '../screens/BlogDetailsScreen';
import { PublicProfileScreen } from '../screens/PublicProfileScreen';

export type RootStackParamList = {
  MainDrawer: undefined;
  BlogDetails: { post: any };
  PublicProfile: { userId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
        <Stack.Screen
          name="BlogDetails"
          component={BlogDetailsScreen}
          options={{
            headerShown: true,
            title: 'Blog Post',
          }}
        />
        <Stack.Screen
          name="PublicProfile"
          component={PublicProfileScreen}
          options={{
            headerShown: true,
            title: 'Profile',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
