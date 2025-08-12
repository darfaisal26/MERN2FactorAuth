import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { register, login } from "../services/auth";

const LoginForm = ({ onLoginSucess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [message, setmessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(username, password);
      setmessage(data.message);
      setError("");
      onLoginSucess(data);
    } catch (error) {
      setError("Something went wrong during login");
    } finally {
      setPassword("");
      setUsername("");
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await register(username, password);
      setIsRegister(false);
      setmessage(data.message);
      setError("");
    } catch (error) {
      setError("Something went wrong during user registration");
    } finally {
      setPassword("");
      setUsername("");
      setConfirmPassword("");
      setIsLoading(false);
      setmessage("");
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setError("");
    setmessage("");
    setShowConfirmPassword(false);
  };

  return (
    <div className=" bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isRegister
              ? "Join us and start your journey today"
              : "Sign in to your account to continue"}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transition-all duration-300">
          <div className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            {isRegister && (
              <div className="space-y-2 animate-in slide-in-from-top duration-300">
                <label className="text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {error && <p className="text-red-500 mb-3">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}

            {/* Submit Button */}
            <button
              onClick={
                isLoading
                  ? undefined
                  : isRegister
                  ? handleRegister
                  : handleLogin
              }
              className={`w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-center cursor-pointer ${
                isLoading ? "opacity-70 cursor-not-allowed transform-none" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>
                    {isRegister ? "Creating Account..." : "Signing In..."}
                  </span>
                </div>
              ) : (
                <span>{isRegister ? "Create Account" : "Sign In"}</span>
              )}
            </button>

            {/* Toggle Mode */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-2 font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-cyan-700 transition-all duration-200"
                >
                  {isRegister ? "Sign In" : "Create Account"}
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
