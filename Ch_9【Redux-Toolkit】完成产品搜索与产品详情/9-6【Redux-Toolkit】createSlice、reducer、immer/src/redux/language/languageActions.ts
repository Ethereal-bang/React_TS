
export const CHANGE_LANGUAGE = 'change_language';
export const ADD_LANGUAGE = 'add_language';

interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE,
    payload: 'zh' | 'en',
}

interface AddLanguageAction {
    type: typeof ADD_LANGUAGE,
    payload: { name: string, code: string },
}

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

export const changeLanguageActionCreator = (languageCode: 'en' | 'zh') : ChangeLanguageAction => {
    return {
        type: CHANGE_LANGUAGE,
        payload: languageCode,
    }
}

export const addLanguageActionCreator = (name: string, code: string) : AddLanguageAction => {
    return {    // 返回的是对象，下面的 type、payload 是该对象的属性（上文有定义
        type: ADD_LANGUAGE,
        payload: { name, code }
    }
}