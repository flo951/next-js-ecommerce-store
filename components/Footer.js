import Link from 'next/link';
import { css } from '@emotion/react';

const footerStyles = css`
  padding: 20px 20px;
  margin: 1rem 1rem;
  border-radius: 5px;
  background-color: #526333;
  a {
    color: white;
    text-decoration: none;
    margin: 5px;
    font-size: 22px;
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
