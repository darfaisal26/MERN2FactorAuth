import { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Shield,
  Smartphone,
  Key,
  ChevronRight,
} from "lucide-react";
import { Setup2FA } from "../services/auth";

const TwoFASetup = ({ onSetupComplete }) => {
  const [message, setMessage] = useState("");
  const [Response, setResponse] = useState("");

  const fetchQrCode = async () => {
    const { data } = await Setup2FA();
    setResponse(data);
  };

  const copyClipBoard = async () => {
    await navigator.clipboard.writeText(Response.secret);
    setMessage("Secret Copied to Clipboard");
  };

  useEffect(() => {
    fetchQrCode();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full border border-slate-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Turn on Verification step
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Scan the QR Code with authenticator app
          </p>
        </div>

        <div className="space-y-8">
          {/* QR Code Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-indigo-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Scan QR Code
              </h2>
            </div>

            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                <img
                  src={Response.qrCode}
                  alt="2fa qr code"
                  className="w-48 h-48"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or Enter the code manually
              </span>
            </div>
          </div>

          {/* Manual Entry Section */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Key className="w-4 h-4 text-amber-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Manual Entry
              </h2>
            </div>

            {message && (
              <div className="mb-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                <Check className="w-4 h-4" />
                {message}
              </div>
            )}

            <div className="relative">
              <input
                type="text"
                readOnly
                defaultValue={""}
                value={Response.secret}
                onClick={copyClipBoard}
                className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 pr-12 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 cursor-pointer hover:bg-amber-50 transition-colors"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-amber-100 rounded-lg transition-colors pointer-events-none">
                <Copy className="w-4 h-4 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <button
              onClick={onSetupComplete}
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              Continue to Verify
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Help Text */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Popular authenticator apps: Google Authenticator, Authy, Microsoft
              Authenticator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFASetup;
