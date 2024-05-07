import cls from './ThemeSwitcher.module.scss'
import { memo } from 'react'
import { useTheme, Theme } from '../../../../app/providers/ThemeProvider'
import { classNames } from '../../../lib/classNames/classNames'
import { MyButton } from '../../Button/Button'


interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme()

    return (
        <MyButton
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={toggleTheme}
            // onClick={() =>
            //     message.info(
            //         'Изменение темы временно отлючена! - theme switcher temporarily disabled!'
            //     )
            // }
        >
            {theme === Theme.DARK ? ' Тема: Темная' : 'Тема: Светлая'}
        </MyButton>
    )
})
