import axiosInstance from "@/utils/axios-instance";

export const AuthService = {
  async login(usernameOrEmail: string, password: string) {
    const response = await axiosInstance.post("/auth/login", {
      username_or_email: usernameOrEmail,
      password,
    });
    return response.data;
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
