import { TFunction } from 'i18next';

export const validateEmail = (email: string, t: TFunction) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return { valid: true, error: '' };
    }

    if (!emailRegex.test(email)) {
        return { valid: false, error: t("error.input.invalid_email") };
    }

    return { valid: true, error: '' };
};