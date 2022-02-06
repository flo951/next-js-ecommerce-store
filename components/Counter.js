import { useState } from 'react';
import { css } from '@emotion/react';

const counterDivStyles = css`
  display: flex;
  gap: 10px;
`;

const counterButtonStyles = css`
  padding: 8px;
  background-color: #297cdb;
  color: white;
  border: 1px solid black;
`;
export default function Counter() {
  const [amount, setAmount] = useState(1);

  const handleIncrementAmount = () => {
    setAmount(amount + 1);
  };
  const handleDecrementAmount = () => {
    if (amount < 1) {
    }
    setAmount(amount - 1);
  };

  return (
    <div css={counterDivStyles}>
      <button
        css={counterButtonStyles}
        onClick={() => {
          handleDecrementAmount();
        }}
      >
        -
      </button>
      <span>{amount}</span>
      <button
        css={counterButtonStyles}
        onClick={() => {
          handleIncrementAmount();
        }}
      >
        +
      </button>
    </div>
  );
}
