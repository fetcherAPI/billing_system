import { Col, Divider } from 'antd';
import { GeneratePaymentCodeForm } from 'features/CreateService';
import SplittersTable from 'widgets/SplittersTable/SplittersTable';

const GeneratePaymentCode = () => {
    return (
        <>
            <Col span={8}>
                <GeneratePaymentCodeForm />
            </Col>

            <Divider />
            <SplittersTable />
        </>
    );
};

export default GeneratePaymentCode;
