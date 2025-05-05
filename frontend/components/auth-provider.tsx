"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import axiosInstance from "@/utils/axios-instance";
import { AuthService } from "@/core/service/api/auth-service";

interface User {
  id: number;
  username: string; // Update to match the provided data
  email: string;
  phone: string;
  role: string;
  avatar_url: string | null; // Add avatar_url field
  is_active: boolean; // Add is_active field
  created_at: string; // Update to match the provided data
  updated_at: string; // Add updated_at field
  wishlist: number[]; // Keep wishlist field
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void; // Add setUser function
  setIsAuthenticated: (isAuthenticated: boolean) => void; // Add setIsAuthenticated function
  login: (emailOrPhone: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticatedState] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const setUser = (user: User | null) => {
    setUserState(user);
  };

  const setIsAuthenticated = (isAuthenticated: boolean) => {
    setIsAuthenticatedState(isAuthenticated);
  };

  // Check for token and fetch user info on page load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      AuthService.getCurrentUser()
        .then((userInfo) => {
          setUser(userInfo);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          localStorage.removeItem("accessToken");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (
    emailOrPhone: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Call the login API using AuthService
      const { access_token } = await AuthService.login(emailOrPhone, password);

      // Save the token to localStorage
      localStorage.setItem("accessToken", access_token);

      // Fetch user info using AuthService
      const userInfo = await AuthService.getCurrentUser();

      // Update user state
      setUser(userInfo);
      setIsAuthenticated(true);
      localStorage.setItem("currentUser", JSON.stringify(userInfo));

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Lấy danh sách người dùng từ localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Kiểm tra xem email hoặc số điện thoại đã tồn tại chưa
      const emailExists =
        userData.email && users.some((u: any) => u.email === userData.email);
      const phoneExists =
        userData.phone && users.some((u: any) => u.phone === userData.phone);

      if (emailExists || phoneExists) {
        return false;
      }

      // Tạo người dùng mới
      const newUser = {
        id: users.length + 1,
        username: userData.fullName || `user_${users.length + 1}`, // Ensure username is set
        email: userData.email || "",
        phone: userData.phone || "",
        password: userData.password, // Trong thực tế, mật khẩu nên được mã hóa
        role: userData.role || "customer",
        avatar_url: null, // Default avatar_url
        is_active: true, // Default is_active
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        wishlist: [],
      };

      // Thêm người dùng mới vào danh sách
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Đăng nhập người dùng mới
      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword as User); // Ensure the object matches the User interface
      setIsAuthenticated(true);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");

    // Redirect to home page
    router.push("/");
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Cập nhật thông tin người dùng trong danh sách users
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) =>
      u.id === user.id ? { ...u, ...userData } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const addToWishlist = (productId: number) => {
    if (!user) return;

    if (user.wishlist.includes(productId)) return;

    const updatedWishlist = [...user.wishlist, productId];
    updateUser({ wishlist: updatedWishlist });
  };

  const removeFromWishlist = (productId: number) => {
    if (!user) return;

    const updatedWishlist = user.wishlist.filter((id) => id !== productId);
    updateUser({ wishlist: updatedWishlist });
  };

  const isInWishlist = (productId: number): boolean => {
    return user ? user.wishlist?.includes(productId) : false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        setUser, // Provide setUser
        setIsAuthenticated, // Provide setIsAuthenticated
        login,
        register,
        logout,
        updateUser,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
