# 11-4【Redux 创建】购物车 Slice

使用 RTK 完成购物车 redux store 搭建。



## 一、Slice 的基本骨架——查看购物车

复制`productDetail`的 Slice 代码后对几个模块逐个修改为查看购物车。

1. **Interface**。
2. **initialState**
3. **Thunk action**：`getshoppingCart`
4. **Slice**：`shoppingCartSlice`



## 二、添加业务 Thunk：添加购物车

```typescript
export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async (parameters: { jwt: string, touristRouteId: string }, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/api/shoppingCart/items`,
            {
                touristRouteId: parameters.touristRouteId,
            }, 
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`
                }
            }
        );
        return data.shoppingCartItems;
    }
)
```



## 三、添加业务 Thunk：删除购物车

```typescript
export const clearShoppingCartItem = createAsyncThunk(
    "shoppingCart/clearShoppingCartItem",
    async (parameters: { jwt: string, itemIds: number[] }, thunkAPI) => {
        return await axios.delete(
            `http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(",")})`,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`
                }
            }
        );
    }
)
```

第 5 行，传入删除购物车的参数`itemIds`以`,`分隔。

因为返回 204 没有响应主体，所以直接返回 Axios 的 api 调用（*其本身就是个 promise*）。



## 四、两业务的 Reducer

复制`getShoppingCart`的 pending、fulfilled、rejected。

```typescript
[addShoppingCartItem.pending.type]: (state) => {
	state.loading = true;
},
[addShoppingCartItem.fulfilled.type]: (state, action) => {
	state.items = action.payload;
	state.loading = false;
	state.error = null;
},
[addShoppingCartItem.rejected.type]: (state, action) => {
	state.loading = false;
	state.error = action.payload;
},
```



清空购物车：

```typescript
[clearShoppingCartItem.fulfilled.type]: (state) => {
    state.items = [];
    state.loading = false;
    state.error = null;
}
```



## 五、`store.ts`中传入该 Slice 的 reducer

```typescript
const rootReducer = combineReducers({
  // ...
  shoppingCart: shoppingCartSlice.reducer,
})
```

