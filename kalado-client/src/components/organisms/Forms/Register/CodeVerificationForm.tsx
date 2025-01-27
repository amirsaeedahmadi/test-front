import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeInput, CustomButton, FormError } from '../../../atoms';
import { PopupBox } from '../../../molecules';
import { verifyCode } from '../../../../api/services/AuthService';
import { toast } from 'react-toastify';
import { useModalContext } from '../../../../contexts';


const CodeVerificationForm: React.FC = () => {
    const { t } = useTranslation();
    const [code, setCode] = useState('');
    const [error, setError] = useState<string>('');
    const { isCodeVerificationVisible, handleClosePopups } = useModalContext();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value) && value.length <= 6) {
            setCode(value);
        }
    };

    const handleClose = () => {
        setCode('');
        setError('');
        handleClosePopups();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Verify Code******");
        console.log(code);
        const response = await verifyCode(code);
        console.log(response);
        if (response.isSuccess) {
            handleClose();
            toast(t("success.code_verification"));
        } else {
            setError(response.message);
        }
    };

    return (
        <PopupBox open={isCodeVerificationVisible} onClose={handleClose}>
            <p>{t("code_verification.enter_code")}</p>
            <form onSubmit={handleSubmit}>
                <CodeInput
                    value={code}
                    onChange={handleChange}
                />
                <CustomButton
                    text={t("code_verification.verify_btn")}
                    type="submit"
                    disabled={code.length !== 6}
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default CodeVerificationForm;
