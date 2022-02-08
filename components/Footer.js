import Link from 'next/link';
import { css } from '@emotion/react';

const footerStyles = css`
  padding: 20px 20px;
  margin: 1rem 1rem 1rem 1rem;
  border-radius: 8px;
  background-color: #01397a;
  a {
    color: white;
    text-decoration: none;
    margin: 5px;
    font-size: 32px;
  }
`;

export default function Footer() {
  return (
    <header css={footerStyles}>
      <Link href="/">
        <a>About</a>
      </Link>
      <Link href="/about">
        <a>Contact</a>
      </Link>
    </header>
  );
}
