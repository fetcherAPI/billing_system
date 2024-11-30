import { Col, Row } from 'antd';
import { Bills } from 'widgets/Bills';
import { AddBill } from 'widgets/Bills/ui/AddBill';

const BillsPage = () => {
    return (
        <>
            <AddBill />
            <Row gutter={240}>
                <Col span={10}>
                    <Bills title="Счета" />
                </Col>
                <Col span={10}>
                    <Bills title="Коды платежа" />
                </Col>
            </Row>
        </>
    );
};

export default BillsPage;
