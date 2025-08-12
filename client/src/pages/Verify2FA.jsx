import { useNavigate } from "react-router-dom";
import TwoFAVerification from "../components/TwoFAVerification";

const Verify2FA = () => {
  const navigate = useNavigate();

  const handleVerification = async (data) => {
    if (data) {
      navigate("/");
    }
  };

  const handle2faReset = async (data) => {
    if (data) {
      navigate("/setup-2fa");
    }
  };
  return (
    <div>
      <TwoFAVerification
        onVerifySuccess={handleVerification}
        onResetSucess={handle2faReset}
      />
    </div>
  );
};

export default Verify2FA;
