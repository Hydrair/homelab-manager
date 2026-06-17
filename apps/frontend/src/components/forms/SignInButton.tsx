type SignInButtonProps = {
  onClick: () => {};
};

export function SignInButton(props: SignInButtonProps) {
  return (
    <>
      <button onClick={props.onClick}>Sign in</button>
    </>
  );
}
