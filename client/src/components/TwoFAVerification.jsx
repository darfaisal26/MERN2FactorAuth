import { useState } from "react";
import { Shield, RefreshCw, AlertCircle, Lock } from "lucide-react";
import { Reset2FA, Verify2FA } from "../services/auth";

const TwoFAVerification = ({ onVerifySuccess, onResetSucess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleTokeVerification = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Verify2FA(otp);
      onVerifySuccess(data);
    } catch (error) {
      setOtp("");
      setError("Invalid otp");
      console.log(error);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Reset2FA();
      onResetSucess(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleTokeVerification} className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">
          Please enter OTP
        </h1>
        <p className="text-gray-600 mt-2">Please enter OTP</p>
      </div>

      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 transition-all duration-300 hover:shadow-3xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              TOTP
            </label>
            <div className="relative">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:bg-white focus:bg-white"
                placeholder="Enter your OTP"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Shield className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6 space-y-3">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Shield className="w-5 h-5" />
            Verify Otp
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Reset Otp
          </button>
        </div>
      </div>
    </form>
  );
};

export default TwoFAVerification;
