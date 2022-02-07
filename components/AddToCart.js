import { css } from '@emotion/react';
import { useState } from 'react';

const addButtonStyles = css`
  margin-top: 8px;
  padding: 16px 8px;
  background-color: #01397a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;

  :hover {
    transition: ease-out 0.3s;
    box-shadow: rgba(240, 46, 170, 0.4) 0px 5px,
      rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px,
      rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px;
  }
`;

export default function AddToCart(props) {
  const [addedToCart, setAddedToCart] = useState('');

  const handleAddToCart = () => {
    if (props.amount === 1) {
      setAddedToCart(`You added one card!`);
    } else {
      setAddedToCart(`You added ${props.amount} cards!`);
    }
  };

  return (
    <>
      <span>Buy for {}</span>
      <button
        css={addButtonStyles}
        data-test-id="product-add-to-cart"
        onClick={() => handleAddToCart()}
      >
        Add to cart
      </button>
      <p>{addedToCart}</p>
    </>
  );
}
