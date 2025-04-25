import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
        let quantity = item.quantity;
        let cost = parseFloat(item.cost.substring(1));
        total += quantity * cost;
    });
    return total;
  };


  const handleContinueShopping = (e) => {
    navigate('/product-list');
  };

  const handleCheckoutShopping = (e) => {
    alert('Coming Soon');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if(item.quantity > 1) {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
    else {
        dispatch(removeItem({ name: item.name}));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name}));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let cost = parseFloat(item.cost.substring(1));
        return item.quantity * cost;
  };

  return (
    <div className="cart-container">
      {/*  Only show total amount if the cart has items */}
      {cart.length > 0 && (
        <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      )}

      <div>
        {cart.length === 0 ? (
          //  Show "Your cart is empty" if there are no items
          <p style={{ color: 'black', fontSize: '20px' }}>Your cart is empty.</p>
        ) : (
          //  If the cart has items, map through them
        cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))
      )}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;