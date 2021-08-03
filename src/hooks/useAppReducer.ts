import React, { createContext, useContext } from 'react';
import { AppState } from '../reducer'

export const AppReducerContext = createContext<[AppState, React.Dispatch<any>] | undefined>(undefined);

export const useAppReducer = () => {
    const reducer = useContext(AppReducerContext);

    if (!reducer) {
        throw new Error('No Context');
    }

    return reducer;
}