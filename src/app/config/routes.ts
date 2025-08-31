import Auth from "@/features/user/components/Auth";
import Inventory from "@/features/inventory/Inventory";
import Main from "@/features/main/Main";
import User from "@/features/user/components/User";
import routes from "@/app/config/routesConfig";

interface AppRoute {
  path: string;
  Component: React.ComponentType;
}

const publicRoutes: AppRoute[] = [
  {
    path: routes.main.home,
    Component: Main,
  },
  {
    path: routes.auth.login,
    Component: Auth,
  },
  {
    path: routes.auth.registration,
    Component: Auth,
  },
  {
    path: routes.inventory.item,
    Component: Inventory,
  },
  {
    path: routes.user.profile,
    Component: User,
  },
];

const authRoutes: AppRoute[] = [

];

export { publicRoutes, authRoutes };
