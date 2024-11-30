import { classNames } from 'shared/lib/classNames/classNames.ts';
import { Theme, useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { Header } from 'widgets/Header';
import cls from './App.module.scss';
import { Suspense, useEffect } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import './App.css';
import { useAppDispatch } from './providers/StoreProvider';
import { refreshToken } from 'features/Auth/model/service/refreshToken';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(refreshToken());
    }, []);

    return (
        <div className={classNames(cls.app, {}, [theme || Theme.LIGHT])}>
            <Header />
            <div className={cls.wrapper}>
                <Suspense fallback={<Loader />}>
                    <AppRouter />
                </Suspense>
            </div>
        </div>
    );
};
