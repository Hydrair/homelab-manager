type SignInButtonProps = {
  onClick: (e: React.FormEvent) => void;
};

export function SignInButton({ onClick }: SignInButtonProps) {
  return (
    <>
      <button onClick={(e) => onClick(e)}>Sign in</button>
    </>
  );
}
