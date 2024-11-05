// actions.js
export const setInitialState = (state) => ({
  type: 'SET_INITIAL_STATE',
  payload: state
});

export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product
});

export const removeFromCart = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId
});

export const updateQuantity = (id, quantity) => ({
  type: 'UPDATE_QUANTITY',
  payload: { id, quantity }
});
export const clearPurchasedItems = (purchasedItems) => ({
  type: 'CLEAR_PURCHASED_ITEMS',
  payload: purchasedItems
});
// actions.js
export const setToken = (token, user) => {
  return {
    type: 'SET_TOKEN',
    payload: { token, user },
  };
};

export const removeToken = () => {
  return {
    type: 'REMOVE_TOKEN',
  };
};
