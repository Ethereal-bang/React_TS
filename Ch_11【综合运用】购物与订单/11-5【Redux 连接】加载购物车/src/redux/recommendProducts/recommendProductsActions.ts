import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START';
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 'FETCH_RECOMMEND_PRODUCTS_SUCCESS';
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL';

interface FetchRecommendProductsStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}

interface FetchRecommendProductsSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
    payload: any;	// API 调用成功后返回的数据
}

interface FetchRecommendProductsFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
    payload: any;	// API 调用失败后返回的数据
}

export type RecommendProductsAction =
    | FetchRecommendProductsStartAction
    | FetchRecommendProductsSuccessAction
    | FetchRecommendProductsFailAction;


export const fetchRecommendProductsStartActionCreator = (): FetchRecommendProductsStartAction => {
    console.log('fetchStart')
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START,
    };
};

export const fetchRecommendProductsSuccessActionCreator = (data): FetchRecommendProductsSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data,
    };
};

export const fetchRecommendProductsFailActionCreator = (error): FetchRecommendProductsFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error,
    };
};

export const giveMeDataActionCreator = (): ThunkAction<
	void,
	RootState,
	undefined,
	RecommendProductsAction
> => async (dispatch, getState) => {
    console.log('请求')
	dispatch(fetchRecommendProductsStartActionCreator());
	try {
		const { data } = await axios.get(
			"http://123.56.149.216:8080/api/productCollections"
		);
		dispatch(fetchRecommendProductsSuccessActionCreator(data));
	} catch (e) {
		dispatch(fetchRecommendProductsFailActionCreator(e.message));
	}
};
