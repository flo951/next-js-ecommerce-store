import Link from 'next/link';
import { css } from '@emotion/react';
import { User } from '../util/database';

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
      background-color: #787878;
      transition: 0.3s ease-out;
    }
  }
  span {
    color: white;
    font-size: 28px;
  }
`;

const circleStyles = css`
  margin: auto;
  background-color: black;
  width: 2rem;
  height: 2rem;
  padding: 4px;
  text-align: center;
  border-radius: 50%;
  box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px,
    rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px,
    rgb(255, 85, 85) 0px 0px 0px 15px;
`;
const flexContainerStyles = css`
  display: flex;
  gap: 2rem;
`;

type Props = {
  items: number | undefined;
  userObject?: User;
};

export default function Header(props: Props) {
  console.log(props);
  return (
    <header css={headerStyles}>
      <Link href="/">
        <a data-test-id="products-link">Products</a>
      </Link>

      {props.userObject ? (
        <div>
          {' '}
          <Link href="/logout">
            <a data-test-id="products-link">Logout</a>
          </Link>
          <span> Hi {props.userObject.username} </span>{' '}
        </div>
      ) : (
        <div>
          {' '}
          <Link href="/register">
            <a data-test-id="products-link">Register</a>
          </Link>
          <Link href="/login">
            <a data-test-id="products-link">Login</a>
          </Link>{' '}
        </div>
      )}

      <div css={flexContainerStyles}>
        <Link href="/cart">
          <a data-test-id="cart-link">Cart</a>
        </Link>

        <div css={circleStyles}>
          <span data-test-id="cart-count">{JSON.stringify(props.items)}</span>
        </div>
      </div>
    </header>
  );
}
