// import { useState } from 'react';
// import { css } from '@emotion/react';
// import Cookies from 'js-cookie';

// const counterDivStyles = css`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 15vw;
//   gap: 10px;
// `;

// const counterButtonStyles = css`
//   padding: 4px;
//   background-color: #01397a;
//   color: white;
//   border-radius: 8px;
//   height: 40px;
//   width: 40px;
//   font-size: 26px;
//   border: none;
//   cursor: pointer;
//   :hover {
//     background-color: #297cdb;
//     transition: ease-out 0.3s;
//   }
// `;
// const addButtonStyles = css`
//   margin-top: 8px;
//   padding: 16px 8px;
//   background-color: #01397a;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   font-size: 20px;
//   cursor: pointer;

//   :hover {
//     transition: ease-out 0.3s;
//     box-shadow: rgba(240, 46, 170, 0.4) 0px 5px,
//       rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px,
//       rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px;
//   }
// `;

// const spanStyles = css`
//   margin: 2px 8px;
// `;
// export default function Counter(props) {
//   const [amount, setAmount] = useState(1);
//   const [minAmount, setMinAmount] = useState('');
//   const [addedToCart, setAddedToCart] = useState('');

//   const handleIncrementAmount = () => {
//     setAmount(amount + 1);
//     setMinAmount('');
//   };
//   const handleDecrementAmount = () => {
//     if (amount <= 1) {
//       setAmount(1);
//       setMinAmount('You can only buy one or more pieces of this product');
//       return;
//     }
//     setAmount(amount - 1);
//   };

//   function handleAddToCart() {
//     if (amount === 1) {
//       setAddedToCart(`You added one card!`);
//     } else {
//       setAddedToCart(`You added ${amount} cards!`);
//     }
//   }

//   return (
//     <>
//       <p>{minAmount}</p>
//       <div css={counterDivStyles}>
//         <div>
//           <button
//             css={counterButtonStyles}
//             onClick={() => {
//               handleDecrementAmount();
//             }}
//           >
//             -
//           </button>
//           <span css={spanStyles}>{amount}</span>
//           <button
//             css={counterButtonStyles}
//             onClick={() => {
//               handleIncrementAmount();
//             }}
//           >
//             +
//           </button>{' '}
//         </div>
//         <button
//           css={addButtonStyles}
//           data-test-id="product-add-to-cart"
//           onClick={() => handleAddToCart()}
//         >
//           Add to cart
//         </button>

//         <p>{addedToCart}</p>
//       </div>
//     </>
//   );
// }
