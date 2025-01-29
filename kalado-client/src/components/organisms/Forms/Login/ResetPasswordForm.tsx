import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NameInput, PasswordInput, CustomButton, FormError } from '../../../atoms';
import { PopupBox } from '../../../molecules';
import { resetPassword } from '../../../../api/services/AuthService';
import { toast } from 'react-toastify';
import { validatePassword } from '../../../../validators';
import { useModalContext } from '../../../../contexts';

const ResetPasswordForm: React.FC = () => {
    const { t } = useTranslation();
    const initialFormData = { token: '', newPassword: '' };
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState<string>('');
    const { isResetPasswordVisible, handleClosePopups } = useModalContext();

    const validateUserInputs = () => {
        const passwordValidationResult = validatePassword(formData.newPassword, t);
        if (!passwordValidationResult.valid) {
            setError(passwordValidationResult.error);
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
            const response = await resetPassword(formData.token, formData.newPassword);
            if (response.isSuccess) {
                handleClose();
                toast(t("success.reset_password"));
            } else {
                setError(response.message);
            }
        }
    };

    return (
        <PopupBox open={isResetPasswordVisible} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <p>{t("forget_password_form.enter_new_passwrod")}</p>
                <NameInput
                    name="token"
                    placeholder={t("general_inputs.token")}
                    value={formData.token}
                    onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                    isRequired={true}
                />
                <PasswordInput
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
                <CustomButton
                    text={t("forget_password_form.change_password_btn")}
                    type="submit"
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default ResetPasswordForm;
