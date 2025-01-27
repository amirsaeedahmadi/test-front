import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmailInput, CustomButton, FormError } from '../../../atoms';
import { PopupBox } from '../../../molecules';
import { resetPassword } from '../../../../api/services/AuthService';
import { toast } from 'react-toastify';
import { validateEmail } from '../../../../validators';
import { useModalContext } from '../../../../contexts';


const ForgetPasswordForm: React.FC = () => {
    const { t } = useTranslation();
    const initialFormData = { email: '' };
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState<string>('');
    const { isForgetPasswordVisible, handleClosePopups } = useModalContext();

    const validateUserInputs = () => {
        const emailValidationResult = validateEmail(formData.email, t);
        if (!emailValidationResult.valid) {
            setError(emailValidationResult.error);
            return false;
        }
        return true;
    };

    const handleClose = () => {
        setFormData(initialFormData);
        setError('');
        handleClosePopups();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateUserInputs()) {
            const response = await resetPassword(formData.email.toLowerCase());
            if (response.isSuccess) {
                handleClose();
                toast(t("success.forget_password"));
            } else {
                setError(response.message);
            }
        }
    };

    return (
        <PopupBox open={isForgetPasswordVisible} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <p>{t("forget_password_form.enter_your_email")}</p>
                <EmailInput
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    isValidatorActive={true}
                />
                <CustomButton
                    text={t("forget_password_form.forget_password_btn")}
                    type="submit"
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default ForgetPasswordForm;
