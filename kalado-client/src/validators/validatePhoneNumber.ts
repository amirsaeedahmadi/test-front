import { TFunction } from 'i18next';

export const validatePhoneNumber = (phoneNumber: string, t: TFunction) => {
    const iranMobileRegex = /^09\d{9}$/;

    if (phoneNumber === '') {
        return { valid: true, error: '' };
    }

    if (!iranMobileRegex.test(phoneNumber)) {
        return { valid: false, error: t("error.input.invalid_phone_number") };
    }

    return { valid: true, error: '' };
};
