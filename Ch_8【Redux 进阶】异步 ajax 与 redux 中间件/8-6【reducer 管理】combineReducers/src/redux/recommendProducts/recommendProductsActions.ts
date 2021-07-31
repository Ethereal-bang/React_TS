export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START';
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 'FETCH_RECOMMEND_PRODUCTS_SUCCESS';
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL';

interface FetchRecommendProductStartAction {
	type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}

interface FetchRecommendProductSuccessAction {
	type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
	payload: any;	// API 调用成功后返回的数据
}

interface FetchRecommendProductFailAction {
	type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
	payload: any;	// API 调用失败后返回的数据
}

export type RecommendProductsAction =
	| FetchRecommendProductStartAction
	| FetchRecommendProductSuccessAction
	| FetchRecommendProductFailAction;


export const fetchRecommendProductsStartActionCreator = () => {
	return {
		type: FETCH_RECOMMEND_PRODUCTS_START,
	};
};

export const fetchRecommendProductsSuccessActionCreator = (data) => {
	return {
		type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
		payload: data,
	};
};

export const fetchRecommendProductsFailActionCreator = (error) => {
	return {
		type: FETCH_RECOMMEND_PRODUCTS_FAIL,
		payload: console.error,
	};
};