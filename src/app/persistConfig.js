// src/persistor.js

import { persistStore } from 'redux-persist';
import { store } from './store'; // Import your Redux store

export const persistor = persistStore(store);
