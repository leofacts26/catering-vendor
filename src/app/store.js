import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/user/userSlice";
import subscriptionReducer from "../features/subscriptionSlice";
import settingReducer from "../features/settingSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    subscription: subscriptionReducer,
    settings: settingReducer,
  },
});

export const persistor = persistStore(store);
