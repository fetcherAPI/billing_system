// import Lottie from 'lottie-react'
import { classNames } from '../../lib/classNames/classNames'
import './Loader.scss'

interface LoaderProps {
    className?: string
}

export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames('lds-ellipsis', {}, [className ])}>
        <div />
        <div />
        <div />
        <div />
    </div>
)
// export const Loader = ({ className }: LoaderProps) => (
//     <Lottie animationData={animation} loop style={{ width: '200px' }} />
// )
