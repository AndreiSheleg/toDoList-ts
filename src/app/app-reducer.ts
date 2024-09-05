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
        case 'CHANGE_THEME':
            return {...state,
            themeMode: action.newTheme}
        default:
            return state
    }
}

//1
export const changeThemeAC = (newTheme: ThemeMode) => {
    return {type: 'CHANGE_THEME', newTheme} as const
}

// 2 Action types
export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>

type ActionsType = ChangeThemeActionType

