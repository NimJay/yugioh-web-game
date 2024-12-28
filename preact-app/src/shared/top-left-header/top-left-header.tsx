import './top-left-header.css';

interface TopLeftHeaderProps {
  href: string;
  textBody: string;
}

function TopLeftHeader(props: TopLeftHeaderProps) {
  const { href, textBody } = props;
  return (
    <header className={`TopLeftHeader`}>
      <a href={href}>{textBody}</a>
    </header>
  );
}

export { TopLeftHeader };
