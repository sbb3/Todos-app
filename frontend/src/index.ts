import { Route, Routes } from "react-router-dom";
import KeepLoggedIn from "./components/auth/KeepLoggedIn";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PublicRoute from "./components/auth/PublicRoute";
import AuthVerification from "./components/auth/AuthVerification";
import Layout from "./pages/Layout";
import Todos from "./pages/Todos";
import NotFoundPage from "./components/layout/NotFoundPage";

export {
  Route,
  Routes,
  KeepLoggedIn,
  Login,
  Register,
  PublicRoute,
  AuthVerification,
  Layout,
  Todos,
  NotFoundPage,
};
