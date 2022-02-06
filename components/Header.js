import Link from 'next/link';
import { css } from '@emotion/react';

const headerStyles = css`
  padding: 20px 20px;
  margin: 1rem 1rem;
  border-radius: 5px;
  background-color: #526333;
  display: flex;
  justify-content: center;
  a {
    color: white;
    text-decoration: none;
    margin: 5px;
    font-size: 22px;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <Link href="/">
        <a>Products</a>
      </Link>
      <Link href="/about">
        <a>Cart</a>
      </Link>
    </header>
  );
}
