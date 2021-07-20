interface LanguageState {
    language: "en" | "zh";  // 直接使用语言代码进行更精确的定义
    languageList: {name: string, code: string}[]    // 语言的切换选项
}

const defaultState: LanguageState = {
    language: "zh",
    languageList: [
        {name: '中文', code: 'zh'},
        {name: 'English', code: 'en'},
    ]
}

export default (state = defaultState, action) => {
    return state;
}