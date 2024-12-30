import storage from 'redux-persist/lib/storage';
import {
  Action,
  ThunkAction,
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';

import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from 'redux-persist';

import type {BGStateType} from './slices/bgSlice';
import type {TabStateType} from './slices/tabSlice';
import type {CartStateType} from './slices/cartSlice';
import type {SortStateType} from './slices/sortSlice';
import type {FilterStateType} from './slices/filterSlice';
import type {WishlistStateType} from './slices/wishlistSlice';
import type {VerificationStateType} from './slices/verificationSlice';

import {bgSlice} from './slices/bgSlice';
import {tabSlice} from './slices/tabSlice';
import {userSlice} from './slices/userSlice';
import {cartSlice} from './slices/cartSlice';
import {sortSlice} from './slices/sortSlice';
import {filterSlice} from './slices/filterSlice';
import {paymentSlice} from './slices/paymentSlice';
import {wishlistSlice} from './slices/wishlistSlice';
import {promocodeSlice} from './slices/promocodeSlice';
import {firstLaunchSlice} from './slices/firstLaunchSlice';

const rootReducer = combineReducers({
  bgSlice: bgSlice.reducer,
  tabSlice: tabSlice.reducer,
  userSlice: userSlice.reducer,
  cartSlice: cartSlice.reducer,
  sortSlice: sortSlice.reducer,
  filterSlice: filterSlice.reducer,
  paymentSlice: paymentSlice.reducer,
  wishlistSlice: wishlistSlice.reducer,
  promocodeSlice: promocodeSlice.reducer,
  firstLaunchSlice: firstLaunchSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tabSlice', 'sortingSlice', 'cartSlice', 'wishlistSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
});

export interface RootState {
  bgSlice: BGStateType;
  cartSlice: CartStateType;
  sortSlice: SortStateType;
  tabSlice: TabStateType;
  filterSlice: FilterStateType;
  wishlistSlice: WishlistStateType;
  verificationSlice: VerificationStateType;
}

export const persistor = persistStore(store);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
