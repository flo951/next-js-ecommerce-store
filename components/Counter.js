import { useState } from 'react';
import { css } from '@emotion/react';
import AddToCart from './AddToCart';

const counterDivStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15vw;
  gap: 10px;
`;

const counterButtonStyles = css`
  padding: 4px;
  background-color: #01397a;
  color: white;
  border-radius: 8px;
  height: 40px;
  width: 40px;
  font-size: 26px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: #297cdb;
    transition: ease-out 0.3s;
  }
`;

const spanStyles = css`
  margin: 2px 8px;
`;
export default function Counter(props) {
  const [amount, setAmount] = useState(1);
  const [minAmount, setMinAmount] = useState('');

  const handleIncrementAmount = () => {
    setAmount(amount + 1);
    setMinAmount('');
  };
  const handleDecrementAmount = () => {
    if (amount <= 1) {
      setAmount(1);
      setMinAmount('You can only buy one or more pieces of this product');
      return;
    }
    setAmount(amount - 1);
  };

  return (
    <>
      <p>{minAmount}</p>
      <div css={counterDivStyles}>
        <div>
          <button
            css={counterButtonStyles}
            onClick={() => {
              handleDecrementAmount();
            }}
          >
            -
          </button>
          <span css={spanStyles}>{amount}</span>
          <button
            css={counterButtonStyles}
            onClick={() => {
              handleIncrementAmount();
            }}
          >
            +
          </button>{' '}
        </div>
        <AddToCart amount={amount} />
      </div>
    </>
  );
}
