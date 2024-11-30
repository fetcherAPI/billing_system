import { Col, Layout, Row } from 'antd';
import { LoginBtn } from 'features/Auth';
import { Link } from 'react-router-dom';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { RegisterBtn } from 'features/Register';
import { BurgerMenu } from './BurgerMenu/ui/BurgerMenu';
import { useEffect, useState } from 'react';
import { HeaderLinks } from './HeaderLinks';
import cls from './Header.module.scss';
import { LogoutBtn } from 'features/Auth/ui/LogoutBtn';

const { Header: HeaderAntd } = Layout;

export const Header = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <HeaderAntd>
            <Row align={'middle'} justify={'space-between'}>
                <Link to={'/'}>
                    <h1 className={cls.logo}>Билинг КЖ</h1>
                </Link>
                {!isMobile ? (
                    <>
                        <HeaderLinks />

                        <Row gutter={16}>
                            <LangSwitcher />
                            <Col>
                                <LogoutBtn />
                                <LoginBtn />
                            </Col>
                            <Col>
                                <RegisterBtn />
                            </Col>
                        </Row>
                    </>
                ) : (
                    <BurgerMenu />
                )}
            </Row>
        </HeaderAntd>
    );
};
