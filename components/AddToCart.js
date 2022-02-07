import { css } from '@emotion/react';
import { useState } from 'react';

const addButtonStyles = css`
  margin-top: 8px;
  padding: 16px 8px;
  background-color: #297cdb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 20px;

  :hover {
    background-color: #01397a;
    transition: ease-out 0.3s;
  }
`;

export default function AddToCart(props) {
  const [addedToCart, setAddedToCart] = useState('');

  const handleAddToCart = () => {
    setAddedToCart(`Succesfully added ${props.amount} cards `);
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
