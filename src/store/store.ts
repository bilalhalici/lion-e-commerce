import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { Middleware } from 'redux'
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

export type RoutState = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RoutState>

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const middlewares = (getDefaultMiddleware: any) =>
  getDefaultMiddleware(
    { serializableCheck: false }
  )
    .concat(sagaMiddleware, process.env.NODE_ENV !== "production" && logger)
    .filter((middleware: any): middleware is Middleware => Boolean(middleware))

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);