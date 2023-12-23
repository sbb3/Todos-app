import {
  KeepLoggedIn,
  Routes,
  Route,
  PublicRoute,
  Login,
  Register,
  AuthVerification,
  Layout,
  Todos,
  NotFoundPage,
} from ".";

function App() {
  return (
    <Routes>
      <Route path="/" element={<KeepLoggedIn />}>
        <Route index element={<Login />} />
        <Route path="register" element={<PublicRoute />}>
          <Route index element={<Register />} />
        </Route>
      </Route>
      <Route element={<AuthVerification />}>
        <Route path="todos" element={<Layout />}>
          <Route index element={<Todos />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
