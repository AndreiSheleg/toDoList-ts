export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appReducer = (
    state: InitialState = initialState,
    action: ActionsType
): InitialState => {
    switch (action.type) {
        //3
        case 'CHANGE_THEME':
            return {...state, themeMode: action.payload}
        default:
            return state
    }
}

//1
export const changeThemeAC = (newTheme: ThemeMode) => {
return {type: 'CHANGE_THEME', payload: newTheme} as const
}

// 2Action types

type ChangeThemeActionType = ReturnType<typeof changeThemeAC>

type ActionsType = ChangeThemeActionType