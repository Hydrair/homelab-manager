interface HighlightedProps extends React.PropsWithChildren {}

export function Highlighted(props: HighlightedProps) {
  return (
    <section className="w-full mx-4 h-1/2 max-h-3/4">{props.children}</section>
  );
}
