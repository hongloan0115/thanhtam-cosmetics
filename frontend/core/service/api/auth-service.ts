import axiosInstance from "@/utils/axios-instance";

export const AuthService = {
  async login(usernameOrEmail: string, password: string) {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username_or_email: usernameOrEmail,
        password,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        throw { message: "Tên đăng nhập hoặc mật khẩu không đúng." }; // Throw structured error
      }
      throw {
        message: error.message || "Đã xảy ra lỗi. Vui lòng thử lại sau.",
      }; // Fallback error
    }
  },

  async register(email: string, password: string, role: string = "customer") {
    const response = await axiosInstance.post("/auth/register", {
      email,
      password,
      role,
    });
    return response.data;
  },

  async getCurrentUser() {
    const response = await axiosInstance.get("/user/me");
    return response.data;
  },

  async updateProfile(fullName: string, phone: string) {
    const response = await axiosInstance.put("/user/profile", {
      username: fullName,
      phone,
    });
    return response.data;
  },

  async changePassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    const response = await axiosInstance.post("/user/change-password", {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },
};
