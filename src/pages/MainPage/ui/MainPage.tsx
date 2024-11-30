import { classNames } from 'shared/lib/classNames/classNames';
import cls from './MainPage.module.scss';
import { SearchBar } from 'widgets/SearchBar';

export const MainPage = () => {
    return (
        <div className={classNames(cls.MainPage, {}, [])}>
            <SearchBar />
        </div>
    );
};
