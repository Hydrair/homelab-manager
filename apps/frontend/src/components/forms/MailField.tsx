type MailFieldProps = {
  onChange: (value: string) => void;
};

export function MailField({ onChange }: MailFieldProps) {
  return (
    <>
      <label htmlFor="mail-field">Mail</label>
      <input
        id="mail-field"
        type="email"
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}
