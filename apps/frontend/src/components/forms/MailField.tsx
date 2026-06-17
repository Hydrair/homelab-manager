type MailFieldProps = {
  onChange: () => {};
};

export function MailField(props: MailFieldProps) {
  return (
    <>
      <label htmlFor="mail-field">Mail</label>
      <input id="mail-field" type="email" onChange={props.onChange} />
    </>
  );
}
