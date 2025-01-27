import { TFunction } from 'i18next';

export const validatePassword = (password: string, t: TFunction) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasUppercase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password === '') {
        return { valid: true, error: '' };
    }

    if (password.length < minLength) {
        return { valid: false, error: t("error.input.invalid_password.min_length") };
    }
    if (!hasNumber.test(password)) {
        return { valid: false, error: t("error.input.invalid_password.has_number") };
    }
    if (!hasUppercase.test(password)) {
        return { valid: false, error: t("error.input.invalid_password.has_uppercase") };
    }
    if (!hasSpecialChar.test(password)) {
        return { valid: false, error: t("error.input.invalid_password.has_special_char") };
    }

    return { valid: true, error: '' };
};
