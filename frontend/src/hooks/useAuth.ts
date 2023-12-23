import { useSelector } from "react-redux";
import { AuthState } from "src/interfaces";

export default function useAuth() {
  const auth = useSelector((state: { auth: AuthState }) => state?.auth);
  if (auth?.accessToken && auth?.user) {
    return true;
  } else {
    return false;
  }
}
