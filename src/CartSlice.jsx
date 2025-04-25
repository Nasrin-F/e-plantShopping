import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            state.items.push({ name, image, cost, quantity: 1 });
        }
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            if (quantity > 0) {
                itemToUpdate.quantity = quantity;
            } else {
                state.items = state.items.filter(item => item.name !== name);
            }
        }
    },
    
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
const store = configureStore({
    reducer: {
        cart: CartSlice.reducer,
    },
});
export default CartSlice.reducer;