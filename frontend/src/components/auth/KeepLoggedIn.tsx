import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useGetNewAccessTokenMutation } from "../../features/auth/authApi";
import theme from "src/theme";

const KeepLoggedIn = () => {
  const accessToken = useSelector((state: any) => state?.auth?.accessToken);
  const navigate = useNavigate();
  const [
    sendGetNewAccessToken,
    { isLoading, isUninitialized, isError, isSuccess },
  ] = useGetNewAccessTokenMutation();

  useEffect(() => {
    const getNewAccessTokenAsync = async () => {
      try {
        await sendGetNewAccessToken({}).unwrap();
      } catch (err: any) {
        return;
      }
    };

    if (!accessToken) {
      getNewAccessTokenAsync();
    } else {
      navigate("/todos", { replace: true });
    }
  }, []);

  if ((isLoading || isUninitialized) && !accessToken)
    return <BeatLoader size={8} color={theme.colors.loader} />;

  if (isError) return <Outlet />;

  if (isSuccess || accessToken) return <Navigate to="/todos" replace />;

  return <Outlet />;
};

export default KeepLoggedIn;
