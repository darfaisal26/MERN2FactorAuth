import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useSession } from "../context/SessionContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useSession();

  const handleLoginSucess = async (userdata) => {
    await login(userdata);
    if (!userdata.isMfaActive) {
      navigate("/setup-2fa");
    } else {
      navigate("/verify-2fa");
    }
  };
  return (
    <div>
      <LoginForm onLoginSucess={handleLoginSucess} />
    </div>
  );
};

export default LoginPage;
