import {
  createRootRouteWithContext,
  Link,
  Outlet
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; username: string; email: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface MyRouterContext {
  auth: AuthState;
}

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}
      <Link to="/dashboard" className="[&.active]:font-bold">
        Dashboard
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout
});
