import {ChangeEvent, useEffect} from "react";
import {Form, Input} from "antd";
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "app/providers/StoreProvider";
import {INN_LENGTH} from "shared/const";
import {setRegisterProperty} from "../../../model/slice/RegisterSlice.ts";
import {useRequest} from "shared/lib/hooks/useRequest";
import {RegisterApi} from "../../../api/RegisterApi.ts";
import {keyOfRegisterSliceSchema} from "../../../types/SliceSchema.ts";

interface INNProps {
    label: string,
    inputName: keyOfRegisterSliceSchema,
    fieldForSetResponse?: keyOfRegisterSliceSchema,
    setResponse?: () => void
}

export const Inn = ({label, inputName, fieldForSetResponse}: INNProps) => {
    const [t] = useTranslation('registration')
    const dispatch = useAppDispatch();
    const {
        isLoading,
        error,
        request,
        response,
    } = useRequest<{ INN: string }>();

    const handleChangeInn = async (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length === INN_LENGTH) {
            await request({INN: value}, RegisterApi.getPersonByInn)
            dispatch(setRegisterProperty({key: inputName, data: value}))
        } else {
            fieldForSetResponse && dispatch(setRegisterProperty({key: fieldForSetResponse, data: ''}))
        }
    };

    useEffect(() => {
        if (fieldForSetResponse && response) {
            console.log(response);
            dispatch(setRegisterProperty({key: fieldForSetResponse, data: response}))
        }
    }, [isLoading])

    return (
        <Form.Item
            name={inputName}
            label={t(label)}
            rules={[
                {
                    required: true,
                    message: t("required")
                },
                {
                    max: 14,
                    message: t('max length 14')
                }
            ]}
        >
            <Input
                status={error ? 'error' : ""}
                aria-errormessage={error}
                // disabled={isLoading}
                placeholder="input placeholder"
                onChange={handleChangeInn}
            />

            <p>
                {}
            </p>

        </Form.Item>
    );
};

