import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmailInput, PasswordInput, CustomButton, CustomLink, FormError } from '../../../atoms';
import { PopupBox } from '../../../molecules';
import { loginUser } from '../../../../api/services/AuthService';
import { toast } from 'react-toastify';
import { useAuth, useModalContext } from '../../../../contexts';
import { validateEmail } from '../../../../validators';


const LoginForm: React.FC = () => {
    const { t } = useTranslation();
    const initialFormData = {
        email: '',
        password: '',
    };
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState<string>('');
    const [areInputsValid, setAreInputsValid] = useState<boolean>(true);
    const { setToken, setRole } = useAuth();
    const { isLoginVisible, handleOpenSignup, handleClosePopups, handleOpenForgetPassword } = useModalContext();

    const validateUserInputs = () => {
        const emailValidationResult = validateEmail(formData.email, t);
        if (!emailValidationResult.valid) {
            setError(emailValidationResult.error);
            setAreInputsValid(false);
            return false;
        }
        setAreInputsValid(true);
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
            const response = await loginUser(formData.email.toLowerCase(), formData.password);
            if (response.isSuccess) {
                setToken(response.data.token);
                setRole(response.data.role);
                localStorage.setItem('token', response.data.token);
                handleClose();
                toast(t("success.login"));
            } else {
                setError(response.message);
            }
        }
    };

    return (
        <PopupBox open={isLoginVisible} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <EmailInput
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <PasswordInput
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <CustomButton
                    text={t("login_form.login_btn")}
                    type="submit"
                    disabled={!areInputsValid}
                />
                <CustomLink
                    to="/#"
                    onClick={(e) => { e.preventDefault(); handleOpenSignup(); }}
                    text={t("login_form.signup_link")}
                />
                <CustomLink
                    to="/#"
                    onClick={(e) => { e.preventDefault(); handleOpenForgetPassword(); }}
                    text={t("login_form.forget_password_link")}
                    fontSize={15}
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default LoginForm;
