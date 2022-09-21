import { HTMLAttributes } from "react";
import { BlueButton } from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../utils/auth";

interface Props {}

const LoginButton = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  const auth = useAuth();

  return (
    <BlueButton
      onClick={auth.isLoggedIn() ? auth.logout : auth.login}
      {...props}
    >
      <FontAwesomeIcon icon={faUser} className="mr-2" />
      {auth.isLoggedIn() ? "Logout" : "Login"}
    </BlueButton>
  );
};

export default LoginButton;
