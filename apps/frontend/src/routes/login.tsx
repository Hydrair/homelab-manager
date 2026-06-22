import { useState } from 'react';
import { MailField } from '../components/forms/MailField';
import { PasswordField } from '../components/forms/PasswordField';
import { SignInButton } from '../components/forms/SignInButton';
import { Highlighted } from '../components/layout/Highlighted';
import { createFileRoute, redirect } from '@tanstack/react-router';
import type { RegisteredRouter } from '@tanstack/react-router';

type RoutePath = keyof RegisteredRouter['routesByPath'];
export const Route = createFileRoute('/login')({
  validateSearch: (search) => ({
    redirect: (search.redirect as RoutePath) || '/'
  }),
  beforeLoad: ({ context, search }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect });
    }
  },
  component: LoginPage
});

function LoginPage() {
  const navigate = Route.useNavigate();
  const { auth } = Route.useRouteContext();
  const { redirect } = Route.useSearch();
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await auth.login(mail, password);
      // Navigate to the redirect URL using router navigation
      navigate({ to: redirect });
    } catch (err) {
      setError('Invalid mail or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Highlighted>
      <h1>Sign in</h1>
      <MailField onChange={setMail} />
      <PasswordField onChange={setPassword} />
      <SignInButton onClick={handleSubmit} />
    </Highlighted>
  );
}
