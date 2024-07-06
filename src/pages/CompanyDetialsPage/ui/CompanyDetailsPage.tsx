import { CompanyDetails, CompanyDetailsControl } from 'widgets/CompanyDetails';
import { useParams } from 'react-router-dom';

const CompanyDetailsPage = () => {
    const { id } = useParams();

    if (!id) return <h1>Company id is not provided</h1>;

    return (
        <div style={{ display: 'flex', height: '100%', columnGap: '20px' }}>
            <CompanyDetailsControl />
            <CompanyDetails />
        </div>
    );
};

export default CompanyDetailsPage;
