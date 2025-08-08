export interface User {
  $id: string;
  email: string;
  name: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
}

export interface BlogPost {
  $id: string;
  title: string;
  content: string;
  author: User;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  readTime?: number;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

export interface AppwriteConfig {
  endpoint: string;
  projectId: string;
}
