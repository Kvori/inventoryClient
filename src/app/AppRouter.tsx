import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/shared/components/Layout/Layout";
import { publicRoutes, authRoutes } from "@/app/config/routes";
import { useAppSelector } from "@/app/hooks/redux";
import routes from "./config/routesConfig";

function AppRouter() {
  const isAuth = useAppSelector((state) => state.userReducer.isAuth);

  return (
    <Routes>
      <Route path={publicRoutes[0].path} element={<Layout />}>
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        {isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
      </Route>
        <Route path="*" element={<Navigate to={routes.auth.login} replace />}></Route>
    </Routes>
  );
}

export default AppRouter;
