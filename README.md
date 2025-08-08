# BlogSpace Mobile App

A React Native/Expo mobile application for BlogSpace, a modern blogging platform. This mobile app connects to the same Appwrite backend as the web version, providing a consistent experience across platforms.

## Features

### 🔐 Authentication
- Email/password authentication via Appwrite
- Secure session management with AsyncStorage
- Automatic login state persistence

### 📱 Screens
- **Home**: Browse latest blog posts with search functionality
- **About**: Learn about BlogSpace and its features
- **Login/Register**: User authentication screens
- **Dashboard**: User's personal dashboard with post management
- **NewBlog**: Create and publish new blog posts
- **Profile**: User profile management and settings
- **PublicProfile**: View other users' profiles and posts
- **BlogDetails**: Full blog post view with author information

### 🎨 Design
- Consistent theme with the web version
- Dark/light mode toggle
- Minimalist and lightweight UI
- Responsive design for mobile devices

### 🧭 Navigation
- Bottom tab navigation for authenticated users
- Stack navigation for screen transitions
- Conditional navigation based on authentication status

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **Backend**: Appwrite (Authentication, Database, Storage)
- **State Management**: React Context API
- **Storage**: AsyncStorage for local data persistence
- **Icons**: Expo Vector Icons (Ionicons)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── BlogCard.tsx
│   └── LoadingScreen.tsx
├── constants/           # App constants and theme
│   └── theme.ts
├── contexts/           # React Context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── navigation/         # Navigation configuration
│   ├── AppNavigator.tsx
│   └── BottomTabNavigator.tsx
├── screens/           # App screens
│   ├── HomeScreen.tsx
│   ├── AboutScreen.tsx
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── NewBlogScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── PublicProfileScreen.tsx
│   └── BlogDetailsScreen.tsx
├── services/          # API and external services
│   └── appwrite.ts
└── types/             # TypeScript type definitions
    └── index.ts
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Appwrite project setup

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd app-2
```

2. Install dependencies:
```bash
npm install
```

3. Configure Appwrite:
   - Update `src/services/appwrite.ts` with your Appwrite credentials
   - Set your endpoint and project ID
   - Configure database and collection IDs

4. Start the development server:
```bash
npx expo start
```

5. Run on your device:
   - Install Expo Go app on your mobile device
   - Scan the QR code from the terminal
   - Or press 'a' for Android or 'i' for iOS simulator

## Configuration

### Appwrite Setup

Update the following in `src/services/appwrite.ts`:

```typescript
const client = new Client()
  .setEndpoint('YOUR_APPWRITE_ENDPOINT')
  .setProject('YOUR_PROJECT_ID');

export const DATABASE_ID = 'YOUR_DATABASE_ID';
export const POSTS_COLLECTION_ID = 'YOUR_POSTS_COLLECTION_ID';
export const USERS_COLLECTION_ID = 'YOUR_USERS_COLLECTION_ID';
export const BUCKET_ID = 'YOUR_BUCKET_ID';
```

### Theme Customization

The app uses a consistent theme defined in `src/constants/theme.ts`. You can customize:

- Colors (primary, secondary, background, text)
- Typography (font sizes, weights)
- Spacing and sizing
- Shadows and borders

## Features in Detail

### Authentication Flow
1. Users can register with email, password, and full name
2. Login with email and password
3. Session persistence across app restarts
4. Automatic logout on session expiration

### Blog Post Management
- Create new posts with title, content, and tags
- View all posts with search and filtering
- Read full post content with author information
- Navigate to author profiles

### User Profiles
- View and edit personal profile information
- Upload profile pictures (placeholder functionality)
- View other users' public profiles
- See user statistics and posts

### Navigation
- **Authenticated Users**: Home, Dashboard, Profile tabs
- **Guest Users**: Home and Login tabs
- Stack navigation for detailed screens
- Conditional navigation based on auth status

## Development

### Adding New Screens
1. Create screen component in `src/screens/`
2. Add to navigation in `src/navigation/AppNavigator.tsx`
3. Update types in `src/types/index.ts` if needed

### Adding New Components
1. Create component in `src/components/`
2. Export from index file if needed
3. Import and use in screens

### Styling
- Use theme constants from `src/constants/theme.ts`
- Follow existing component patterns
- Maintain consistency with design system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub or contact the development team.

---

**Note**: This mobile app is designed to work with the existing BlogSpace web application and shares the same Appwrite backend. Make sure your Appwrite project is properly configured with the required collections and permissions.
