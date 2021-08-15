import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import { actionLog } from './middlewares/actionLog';
import { productDetailSlice } from "./productDetail/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productSearchSlice } from "./productSearch/slice";
import { UserSlice } from "./user/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',    // 数据根目录
    storage,        // 数据保存方式，localStorage
    whitelist: ['user'] // 白名单
}

const rootReducer =  combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: UserSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
    devTools: true, 
})

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

const rootStore = {
    store, 
    persistor,
}
export default rootStore;
