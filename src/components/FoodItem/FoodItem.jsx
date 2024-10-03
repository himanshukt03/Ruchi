import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, rating }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [isOrdering, setIsOrdering] = useState(false);

  const handleOrder = () => {
    if (!cartItems[id]) {
      addToCart(id);
    }
    setIsOrdering(true);
  };

  const handleRemove = () => {
    if (cartItems[id] > 1) {
      removeFromCart(id);
    } else {
      // If item count reaches 0, reset to "Make an order" button
      removeFromCart(id);
      setIsOrdering(false);
    }
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} alt={name} className="food-item-img" />
      </div>
      <div className="food-item-info">
        <div className="food-item-title">
          <h3 className="food-item-name">{name}</h3>
          <div className="food-item-rating">
            <img src='/frontend/src/assets/rating_starts.png' alt="Star" />
            <span>stars</span>
          </div>
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-bottom">
          <p className="food-item-price">${price}</p>
          {!isOrdering ? (
            <button className="order-button" onClick={handleOrder}>
              Make an order
            </button>
          ) : (
            <div className="food-item-counter">
              <img
                src={assets.remove_icon_red}
                alt="remove"
                onClick={handleRemove} 
              />
              <p>{cartItems[id]}</p>
              <img
                src={assets.add_icon_green}
                alt="add"
                onClick={() => addToCart(id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
