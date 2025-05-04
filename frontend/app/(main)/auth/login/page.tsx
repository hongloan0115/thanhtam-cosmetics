"use client";

import type React from "react";

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
import { Eye, EyeOff, AlertCircle, Mail, Lock, Phone } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AuthService } from "@/core/service/api/auth-service"; // Use AuthService for API calls

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  // Phương thức đăng nhập
  const [method, setMethod] = useState<"email" | "phone" | "otp">("email");

  // Dữ liệu form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  // Trạng thái UI
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Xử lý đăng nhập bằng email hoặc số điện thoại
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const identifier = method === "email" ? email : phone;

    if (!identifier.trim()) {
      setError(
        `Vui lòng nhập ${method === "email" ? "email" : "số điện thoại"}`
      );
      return;
    }

    if (!password) {
      setError("Vui lòng nhập mật khẩu");
      return;
    }

    setIsSubmitting(true);

    try {
      // Use AuthService for login
      const success = await login(identifier, password);
      if (success) {
        router.push("/account");
      } else {
        setError(
          `${
            method === "email" ? "Email" : "Số điện thoại"
          } hoặc mật khẩu không đúng`
        );
      }
    } catch (error) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gửi mã xác thực đến Zalo (giả lập)
  const sendVerificationCode = () => {
    if (!phone.trim()) {
      setError("Vui lòng nhập số điện thoại");
      return;
    } else if (!/^[0-9]{10,11}$/.test(phone.replace(/\s/g, ""))) {
      setError("Số điện thoại không hợp lệ");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Giả lập gửi mã xác thực
    setTimeout(() => {
      setIsCodeSent(true);
      setIsSubmitting(false);

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
    if (verificationCode.length !== 6) {
      setError("Vui lòng nhập đủ 6 số");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Giả lập xác thực mã OTP (mã đúng là "123456")
    setTimeout(() => {
      if (verificationCode === "123456") {
        router.push("/account");
      } else {
        setError("Mã xác thực không đúng");
        setIsSubmitting(false);
      }
    }, 1500);
  };

  // Đăng nhập bằng Google
  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    setError("");

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
              Đăng nhập
            </CardTitle>
            <CardDescription className="text-center">
              Đăng nhập vào tài khoản của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs
              defaultValue="email"
              onValueChange={(value) =>
                setMethod(value as "email" | "phone" | "otp")
              }
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Số điện thoại</TabsTrigger>
                <TabsTrigger value="otp">Mã OTP</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4 pt-4">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
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
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Link
                          href="/auth/forgot-password"
                          className="text-sm text-pink-600 hover:underline"
                        >
                          Quên mật khẩu?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
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
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-pink-600 hover:bg-pink-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4 pt-4">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="phone"
                          placeholder="0912345678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-phone">Mật khẩu</Label>
                        <Link
                          href="/auth/forgot-password"
                          className="text-sm text-pink-600 hover:underline"
                        >
                          Quên mật khẩu?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="password-phone"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
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
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-pink-600 hover:bg-pink-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="otp" className="space-y-4 pt-4">
                {!isCodeSent ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone-otp">Số điện thoại</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <Input
                            id="phone-otp"
                            placeholder="0912345678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="pl-10"
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
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Mã xác thực đã được gửi đến Zalo của số điện thoại
                      </p>
                      <p className="font-medium">{phone}</p>
                    </div>

                    {/* <div className="space-y-2">
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
                    </div> */}

                    <Button
                      onClick={verifyCode}
                      className="w-full bg-pink-600 hover:bg-pink-700"
                      disabled={isSubmitting || verificationCode.length !== 6}
                    >
                      {isSubmitting ? "Đang xác thực..." : "Xác thực"}
                    </Button>
                  </>
                )}
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Hoặc
                </span>
              </div>
            </div>

            <Button
              onClick={handleGoogleLogin}
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
              {isSubmitting ? "Đang xử lý..." : "Đăng nhập với Google"}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Chưa có tài khoản?{" "}
              <Link
                href="/auth/register"
                className="text-pink-600 hover:underline font-medium"
              >
                Đăng ký
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
