// reducer.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('cartState');
    if (serializedState === null) {
      return {
        items: [],
        total: 0
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading cart state:', err);
    return {
      items: [],
      total: 0
    };
  }
};

const saveState = async (state) => {
  try {
    await AsyncStorage.setItem('cartState', JSON.stringify(state));
  } catch (err) {
    console.error('Error saving cart state:', err);
  }
};

export const initialState = {
  items: [],
  total: 0
};

export const cartReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return {
        ...state,
        ...action.payload
      };

    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }
          return item;
        });

        newState = {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price
        };
      }
      break;

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item._id === action.payload);
      newState = {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        total: state.total - (itemToRemove.price * itemToRemove.quantity)
      };
      break;

    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item => {
        if (item._id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.quantity
          };
        }
        return item;
      });

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );

      newState = {
        ...state,
        items: updatedItems,
        total: newTotal
      };
      break;

     case 'CLEAR_PURCHASED_ITEMS':
      newState = {
        ...state,
        items: state.items.filter(item => 
          !action.payload.some(purchased => purchased._id === item._id)
        ),
      };

      // Cập nhật tổng tiền sau khi xóa
      newState.total = newState.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );

      break;

    default:
      return state;
  }

  // Save to AsyncStorage after each change
  saveState(newState);
  return newState;
};