import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { useEffect } from "react";
import { logoutUser } from "../services/auth";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useSession();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!user) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading session...</p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto py-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {user.username} 👋
      </h1>
      <p className="mb-6">
        You have successfully logged in and verified your 2FA.
      </p>
      <button
        onClick={handleLogout}
        type="button"
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
      >
        Logout
      </button>
    </main>
  );
};

export default Home;
