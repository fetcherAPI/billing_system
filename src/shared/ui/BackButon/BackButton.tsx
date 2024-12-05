import { useNavigate } from 'react-router';
import { Col, Row } from 'antd';
import { Button1, ThemeButton } from '../Button1';

export const BackButton = ({
    children,
    path,
}: {
    children?: JSX.Element[] | JSX.Element | false | null;
    path?: string;
}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (path) {
            navigate(path);
        } else {
            navigate(-1);
        }
    };
    return (
        <Row gutter={16}>
            <Col>
                <Button1 theme={ThemeButton.ACTION} onClick={handleClick}>
                    Назад
                </Button1>
            </Col>
            <Col>{children}</Col>
        </Row>
    );
};
