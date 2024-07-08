import { ReactNode } from 'react';
import cls from './style.module.scss';
import { classNames } from '../../lib/classNames/classNames.ts';

/**
 * Interface for the props used in BluredBackGround component
 */
interface Props {
    /** The width of the component */
    width?: number;
    /** The height of the component */
    height?: number;
    /** The unit for the width (optional), default is '%' */
    unitWidth?: '%' | 'vw';
    /** The unit for the height (optional), default is '%' */
    unitHeight?: '%' | 'vh';
    /** The children elements to be rendered inside the component */
    children: ReactNode;

    className?: string;
}

/**
 * BluredBackGround component
 *
 * This component renders a div with a specified width and height, and contains child elements.
 *
 * @param {Props} props - The properties to configure the component
 * @returns {JSX.Element} The rendered component
 */
export const BluredBackGround = (props: Props): JSX.Element => {
    const { height, width, children, unitWidth, unitHeight, className } = props;
    return (
        <div
            className={classNames(cls.blur, {}, [className])}
            style={{ width: `${width}${unitWidth || '%'}`, height: `${height}${unitHeight || '%'}` }}
        >
            {children}
        </div>
    );
};
