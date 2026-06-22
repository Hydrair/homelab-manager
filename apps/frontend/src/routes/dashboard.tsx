import {
  createFileRoute,
  redirect,
  type RegisteredRouter
} from '@tanstack/react-router';
import { Highlighted } from '../components/layout/Highlighted';

type RoutePath = keyof RegisteredRouter['routesByPath'];

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href as RoutePath
        }
      });
    }
  },
  component: About
});

function About() {
  return (
    <Highlighted>
      <h1>Dashboard</h1>
      <h2>Server total</h2>
      <h2>Services total</h2>
      <h2>Server latest</h2>
      <h2>Services latest</h2>
    </Highlighted>
  );
}
