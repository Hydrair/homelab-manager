type PasswordFieldProps = {
  onChange: (value: string) => void;
};

export function PasswordField({ onChange }: PasswordFieldProps) {
  return (
    <>
      <label htmlFor="password-field">Password</label>
      <input
        id="password-field"
        type="password"
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}
