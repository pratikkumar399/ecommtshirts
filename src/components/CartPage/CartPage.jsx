import "./CartPage.css";
import React, { useContext } from "react";
import CartContext from "../../context/Context";
import CartItem from "./CartItem/CartItem";
import StripeCheckout from "react-stripe-checkout";

const ErrorMessage = () => {
  return (
    <p className="cart__error">
      Oops... you didn't add any product to your cart :( <br />
      <a href="/">Go to the shop</a> and check out our amazing products.
    </p>
  );
};

const CartProducts = () => {
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  return (
    <div>
      <div className="shop__grid">
        {cartContext.items.map((item) => (
          <CartItem
            key={Math.random()}
            name={item.name}
            amount={item.amount}
            price={item.price}
            image={item.image}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        ))}
      </div>

      <div className="shop__info">
        <h3>Total amount: {totalAmount}</h3>

        <button
        >
          {
            <StripeCheckout
              stripeKey="pk_test_51NOQr6SDTAaBjofmX1mGe1bJQPlCuX8GObCKd4uEaYOlnSRraiyKyLD22wDHz3VDxVofEHIvuBSztjHDiaSAyxIp003LfD2VZY"
              name="Tshirt Shop"
              amount={totalAmount * 100}
              label="Pay to Thsirts"
              description={`Your total is ${totalAmount}`}
            />
          }
        </button>

        <h6>{`Use demo card no : 4242 4242 4242 4242`}</h6>
      </div>
    </div>
  );
};

const CartPage = () => {
  const cartContext = useContext(CartContext);
  const isEmpty = cartContext.items.length === 0;

  return (
    <section className="cart">
      <div className="cart__content">
        <h2 className="cart__title">Cart</h2>

        {isEmpty ? <ErrorMessage /> : <CartProducts />}
      </div>
    </section>
  );
};

export default CartPage;
