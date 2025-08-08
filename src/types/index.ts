import { Models } from "appwrite";

export interface User extends Models.User { }

export interface BlogPost extends Models.Document {
  title: string;
  body: string;
  tags: Array<string>;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
