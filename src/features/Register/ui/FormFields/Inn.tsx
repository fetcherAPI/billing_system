import { ChangeEvent, useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { INN_LENGTH } from 'shared/const';
import { setRegisterProperty } from '../../model/slice/RegisterSlice.ts';
import { useRequest } from 'shared/lib/hooks/useRequest';
import { RegisterApi } from '../../api/RegisterApi.ts';
import { keyOfRegisterSliceSchema, keyOfUserRegister } from '../../types/SliceSchema.ts';

interface INNProps<T> {
    label: string;
    inputName: T;
    fieldForSetResponse?: T;
    type: 'User' | 'Company';
    setResponse?: () => void;
}

export const Inn = ({
    label,
    inputName,
    fieldForSetResponse,
    type,
}: INNProps<keyOfRegisterSliceSchema | keyOfUserRegister>) => {
    const [t] = useTranslation('registration');

    const dispatch = useAppDispatch();

    const { isLoading, error, request, response } = useRequest<{ INN: string }>();

    const handleChangeInn = async (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length === INN_LENGTH) {
            await request({ INN: value }, RegisterApi.getPersonByInn);
            dispatch(setRegisterProperty({ key: inputName, data: value, type }));
        }
    };

    useEffect(() => {
        if (fieldForSetResponse && response) {
            dispatch(setRegisterProperty({ key: fieldForSetResponse, data: response, type }));
        }
        if (fieldForSetResponse && error) {
            dispatch(setRegisterProperty({ key: fieldForSetResponse, data: error, type }));
        }
    }, [isLoading, error]);

    return (
        <Form.Item
            name={inputName}
            label={t(label)}
            rules={[
                {
                    required: true,
                    message: t('required'),
                },
                {
                    max: 14,
                    message: t('max length 14'),
                },
                {
                    min: 14,
                    message: 'минимум 14 символов',
                },
            ]}
        >
            <Input
                status={error ? 'error' : ''}
                aria-errormessage={error}
                // disabled={isLoading}
                onChange={handleChangeInn}
            />
        </Form.Item>
    );
};
