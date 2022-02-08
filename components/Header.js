import Link from 'next/link';
import { css } from '@emotion/react';

const headerStyles = css`
  padding: 20px 20px;
  margin: 1rem 1rem;
  border-radius: 8px;
  background-color: #01397a;
  display: flex;
  justify-content: space-between;

  a {
    color: white;
    text-decoration: none;
    margin: 5px;
    font-size: 32px;
    padding: 8px;
    border-radius: 8px;
    :hover {
      background-color: #297cdb;
      transition: 0.3s ease-out;
    }
  }
`;

export default function Header(props) {
  return (
    <header css={headerStyles}>
      <Link href="/">
        <a>Products</a>
      </Link>
      <Link href="/cart">
        <a>Cart</a>
      </Link>
    </header>
  );
}
