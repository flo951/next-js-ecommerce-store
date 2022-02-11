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
  span {
    color: white;
    font-size: 28px;
  }
`;

export default function Header(props) {
  return (
    <header css={headerStyles}>
      <Link href="/">
        <a>Products</a>
      </Link>
      <div>
        <Link href="/cart">
          <a data-test-id="cart-link">Cart</a>
        </Link>

        <span data-test-id="cart-count">{JSON.stringify(props.items)}</span>
      </div>
    </header>
  );
}
