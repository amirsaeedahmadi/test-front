import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NameInput, EmailInput, PhoneNumberInput, PasswordInput, CustomButton, CustomLink, FormError } from '../../../atoms';
import { PopupBox } from '../../../molecules';
import { signupUser } from '../../../../api/services/AuthService';
import { toast } from 'react-toastify';
import { validatePassword, validatePhoneNumber } from '../../../../validators';
import { useModalContext } from '../../../../contexts';


const SignupForm: React.FC = () => {
  const { t } = useTranslation();
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordRepeat: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState<string>('');
  const { isSignupVisible, handleOpenLogin, handleOpenCodeVerification, handleClosePopups } = useModalContext();

  const validateUserInputs = () => {
    const phoneValidationResult = validatePhoneNumber(formData.phoneNumber, t);
    if (!phoneValidationResult.valid) {
      setError(phoneValidationResult.error);
      return false;
    }

    const passwordValidationResult = validatePassword(formData.password, t);
    if (!passwordValidationResult.valid) {
      setError(passwordValidationResult.error);
      return false;
    }

    if (formData.password !== formData.passwordRepeat) {
      setError(t("signup_form.error.password_mismatch"));
      return false;
    }

    return true;
  }

  const handleClose = () => {
    setFormData(initialFormData);
    setError('');
    handleClosePopups();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateUserInputs()) {
      const response = await signupUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email.toLowerCase(),
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: 'USER',
      });

      if (response.isSuccess) {
        handleClose();
        toast(t("success.signup"));
        handleOpenCodeVerification();
      } else {
        setError(response.message);
      }
    }
  };

  return (
    <PopupBox open={isSignupVisible} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <NameInput
          name="firstName"
          placeholder={t("general_inputs.first_name")}
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          isRequired={true}
        />
        <NameInput
          name="lastName"
          placeholder={t("general_inputs.last_name")}
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          isRequired={true}
        />
        <EmailInput
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          isValidatorActive={true}
        />
        <PhoneNumberInput
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          isValidatorActive={true}
        />
        <PasswordInput
          name="passwordRepeat"
          placeholder={t("general_inputs.password_repeat")}
          value={formData.passwordRepeat}
          onChange={(e) => setFormData({ ...formData, passwordRepeat: e.target.value })}
        />
        <CustomButton
          text={t("signup_form.signup_btn")}
          type="submit"
        />
        <CustomLink
          to="/#"
          onClick={(e) => { e.preventDefault(); handleOpenLogin(); }}
          text={t("signup_form.login_link")}
        />
        <CustomLink
          to="/#"
          onClick={(e) => { e.preventDefault(); handleOpenCodeVerification(); }}
          text={t("signup_form.code_verification_link")}
          fontSize={15}
        />
        <FormError message={error} />
      </form>
    </PopupBox>
  );
};

export default SignupForm;
