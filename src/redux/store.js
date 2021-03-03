import { createStore, compose, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import sagas from "./sagas";

const persistConfig = {
  key: "vaisha",
  storage
};
const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const configureStore = initialState => {
  const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(sagas);

  return {
    store,
    persistor
  };
  
};
export default configureStore;
