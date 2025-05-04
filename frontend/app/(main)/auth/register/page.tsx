"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  AlertCircle,
  Phone,
  User,
  Lock,
  Mail,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/utils/axios-instance"; // Import axiosInstance

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  // Các bước đăng ký
  const [step, setStep] = useState<"method" | "verify" | "complete">("method");

  // Phương thức đăng ký
  const [method, setMethod] = useState<"phone" | "email" | "google">("phone");

  // Dữ liệu form
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Trạng thái UI
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Xác thực số điện thoại
  const validatePhone = () => {
    if (!phone.trim()) {
      setErrors({ phone: "Vui lòng nhập số điện thoại" });
      return false;
    } else if (!/^[0-9]{10,11}$/.test(phone.replace(/\s/g, ""))) {
      setErrors({ phone: "Số điện thoại không hợp lệ" });
      return false;
    }
    setErrors({});
    return true;
  };

  // Xác thực email
  const validateEmail = () => {
    if (!email.trim()) {
      setErrors({ email: "Vui lòng nhập email" });
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: "Email không hợp lệ" });
      return false;
    }
    setErrors({});
    return true;
  };

  // Xác thực mã OTP
  const validateOTP = () => {
    if (verificationCode.length !== 6) {
      setErrors({ otp: "Vui lòng nhập đủ 6 số" });
      return false;
    }
    setErrors({});
    return true;
  };

  // Xác thực thông tin cá nhân
  const validatePersonalInfo = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gửi mã xác thực đến Zalo (giả lập)
  const sendVerificationCode = () => {
    if (method === "phone" && !validatePhone()) return;
    if (method === "email" && !validateEmail()) return;

    setIsSubmitting(true);
    setGeneralError("");

    // Giả lập gửi mã xác thực
    setTimeout(() => {
      setIsCodeSent(true);
      setIsSubmitting(false);
      setStep("verify");

      // Đặt thời gian đếm ngược 60 giây
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  // Xác thực mã OTP
  const verifyCode = () => {
    if (!validateOTP()) return;

    setIsSubmitting(true);
    setGeneralError("");

    // Giả lập xác thực mã OTP (mã đúng là "123456")
    setTimeout(() => {
      if (verificationCode === "123456") {
        setStep("complete");
        setIsSubmitting(false);
      } else {
        setErrors({ otp: "Mã xác thực không đúng" });
        setIsSubmitting(false);
      }
    }, 1500);
  };

  // Đăng ký trực tiếp bằng email (không cần OTP)
  const registerWithEmail = () => {
    if (!validateEmail()) return;
    if (!password || password.length < 6 || password !== confirmPassword)
      return;

    setIsSubmitting(true);
    setGeneralError("");

    axiosInstance
      .post("/api/auth/register", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 201) {
          router.push("/account");
        } else {
          setGeneralError("Email đã được sử dụng. Vui lòng thử email khác.");
        }
      })
      .catch((error) => {
        setGeneralError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        console.error("Registration error:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Hoàn thành đăng ký
  const completeRegistration = async () => {
    if (!validatePersonalInfo()) return;

    setIsSubmitting(true);
    setGeneralError("");

    try {
      // Đăng ký người dùng
      const success = await register({
        fullName: fullName,
        phone: method === "phone" ? phone : undefined,
        email: method === "email" ? email : undefined,
        password: password,
        role: "Khách hàng",
      });

      if (success) {
        router.push("/account");
      } else {
        setGeneralError("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.");
      }
    } catch (error) {
      setGeneralError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Đăng ký bằng Google
  const handleGoogleSignup = () => {
    setIsSubmitting(true);
    setGeneralError("");

    // Giả lập đăng nhập Google
    setTimeout(() => {
      // Giả lập thành công
      router.push("/account");
    }, 1500);
  };

  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Đăng ký tài khoản
            </CardTitle>
            <CardDescription className="text-center">
              {step === "method" && "Chọn phương thức đăng ký tài khoản"}
              {step === "verify" &&
                "Nhập mã xác thực đã gửi đến " +
                  (method === "phone" ? "Zalo" : "email") +
                  " của bạn"}
              {step === "complete" && "Hoàn thành thông tin tài khoản của bạn"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generalError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{generalError}</AlertDescription>
              </Alert>
            )}

            {step === "method" && (
              <div className="space-y-4">
                <Tabs
                  defaultValue="phone"
                  onValueChange={(value) =>
                    setMethod(value as "phone" | "email" | "google")
                  }
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="phone">Số điện thoại</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="google">Google</TabsTrigger>
                  </TabsList>
                  <TabsContent value="phone" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <Input
                            id="phone"
                            placeholder="0912345678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={`pl-10 ${
                              errors.phone ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        <Button
                          onClick={sendVerificationCode}
                          disabled={isSubmitting}
                          className="bg-pink-600 hover:bg-pink-700"
                        >
                          {isSubmitting ? "Đang gửi..." : "Gửi mã"}
                        </Button>
                      </div>
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="email" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`pl-10 ${
                            errors.email ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Mật khẩu</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`pl-10 pr-10 ${
                            errors.password ? "border-red-500" : ""
                          }`}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`pl-10 pr-10 ${
                            errors.confirmPassword ? "border-red-500" : ""
                          }`}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <Button
                      onClick={registerWithEmail}
                      className="w-full bg-pink-600 hover:bg-pink-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                    </Button>
                  </TabsContent>
                  <TabsContent value="google" className="space-y-4 pt-4">
                    <Button
                      onClick={handleGoogleSignup}
                      className="w-full flex items-center justify-center gap-2"
                      variant="outline"
                      disabled={isSubmitting}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                      >
                        <path
                          fill="#EA4335"
                          d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                        />
                        <path
                          fill="#34A853"
                          d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                        />
                        <path
                          fill="#4A90E2"
                          d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                        />
                      </svg>
                      {isSubmitting ? "Đang xử lý..." : "Đăng ký với Google"}
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {step === "verify" && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Mã xác thực đã được gửi đến{" "}
                    {method === "phone" ? "Zalo của số điện thoại" : "email"}
                  </p>
                  <p className="font-medium">
                    {method === "phone" ? phone : email}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">Nhập mã xác thực</Label>
                  <InputOTP
                    maxLength={6}
                    value={verificationCode}
                    onChange={setVerificationCode}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {errors.otp && (
                    <p className="text-sm text-red-500">{errors.otp}</p>
                  )}
                  <div className="text-center mt-4">
                    {countdown > 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Gửi lại mã sau {countdown} giây
                      </p>
                    ) : (
                      <Button
                        variant="link"
                        className="text-pink-600 p-0 h-auto"
                        onClick={sendVerificationCode}
                        disabled={isSubmitting}
                      >
                        Gửi lại mã
                      </Button>
                    )}
                  </div>
                </div>

                <Button
                  onClick={verifyCode}
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  disabled={isSubmitting || verificationCode.length !== 6}
                >
                  {isSubmitting ? "Đang xác thực..." : "Xác thực"}
                </Button>
              </div>
            )}

            {step === "complete" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      id="fullName"
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`pl-10 ${
                        errors.fullName ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 pr-10 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 pr-10 ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button
                  onClick={completeRegistration}
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang xử lý..." : "Hoàn thành đăng ký"}
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Bằng cách đăng ký, bạn đồng ý với{" "}
              <Link href="/terms" className="text-pink-600 hover:underline">
                Điều khoản sử dụng
              </Link>{" "}
              và{" "}
              <Link href="/privacy" className="text-pink-600 hover:underline">
                Chính sách bảo mật
              </Link>{" "}
              của chúng tôi.
            </div>
            <Separator />
            <div className="text-center text-sm">
              Đã có tài khoản?{" "}
              <Link
                href="/auth/login"
                className="text-pink-600 hover:underline font-medium"
              >
                Đăng nhập
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
