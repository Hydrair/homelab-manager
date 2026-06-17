type PasswordFieldProps = {
  onChange: () => {};
};

export function PasswordField(props: PasswordFieldProps) {
  return (
    <>
      <label htmlFor="password-field">Password</label>
      <input id="password-field" type="password" onChange={props.onChange} />
    </>
  );
}
