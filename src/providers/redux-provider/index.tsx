'use client';

import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from '@store/store';


interface IReduxProviderProps {
    children: ReactNode;
}

const ReduxProvider: React.FC<IReduxProviderProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;