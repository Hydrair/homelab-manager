import { useState } from 'react';
import { AuthApi } from '../api/auth';
import { MailField } from '../components/forms/MailField';
import { PasswordField } from '../components/forms/PasswordField';
import { SignInButton } from '../components/forms/SignInButton';
import { Highlighted } from '../components/layout/Highlighted';

export function LoginPage() {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <Highlighted>
      <h1>Sign in</h1>
      <MailField onChange={() => setMail} />
      <PasswordField onChange={() => setPassword} />
      <SignInButton onClick={async () => await AuthApi.login(mail, password)} />
    </Highlighted>
  );
}
