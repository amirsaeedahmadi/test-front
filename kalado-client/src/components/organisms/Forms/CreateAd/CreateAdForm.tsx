import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NameInput, PriceInput, YearInput, Dropdown, DescriptionInput, CustomButton, FormError } from '../../../atoms';
import { PopupBox, ImageUploadBox } from '../../../molecules';
import { createProductWithImages } from '../../../../api/services/ProductService';
import { toast } from 'react-toastify';
import { useModalContext, useAuth } from '../../../../contexts';
import { OptionsComponent } from '../../../../constants/options';
import { ProductData } from '../../../../constants/apiTypes';


const CreateAdForm: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<ProductData>({
        title: '',
        price: {
            amount: 0,
            unit: 'TOMAN',
        },
        category: '',
        description: '',
        productionYear: null,
        brand: null,
    });
    const { token } = useAuth();
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<string>('');
    const { product_categories } = OptionsComponent();
    const { isCreateAdVisible, handleClosePopups } = useModalContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleYearChange = (date: Date | null) => {
        console.log(date.getFullYear())
        setFormData(prevData => ({
            ...prevData,
            productionYear: date


        }));
    };

    const handleImageUpload = (files: File[]) => {
        console.log("handleImageUpload")
        console.log(files);
        setImages(files);
        setError('');
    };

    const handleClose = () => {
        setFormData({
            title: '',
            price: {
                amount: 0,
                unit: 'TOMAN',
            },
            category: '',
            description: '',
            productionYear: null,
            brand: null,
        });
        setImages([]);
        setError('');
        handleClosePopups();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (images.length === 0) {
            setError(t("error.create_ad.required_image"));
            return;
        }

        console.log("Create Ad API call");
        console.log(formData.category);
        console.log(formData);
        console.log(images);

        const response = await createProductWithImages(formData, images);
        if (response.isSuccess) {
            handleClose();
            toast(t("success.create_ad"));
        } else {
            setError(response.message);
        }
    };

    return (
        <PopupBox open={isCreateAdVisible} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <NameInput
                    name="title"
                    placeholder={t("create_ad.input.title")}
                    value={formData.title}
                    onChange={handleChange}
                    isRequired={true}
                    isStarNeeded={true}
                />
                <PriceInput
                    value={formData.price}
                    onChange={(price: { amount: number; unit: string }) => setFormData(prevData => ({ ...prevData, price }))}
                    isRequired={true}
                    isStarNeeded={true}
                />
                <Dropdown
                    options={product_categories}
                    placeholder={t("create_ad.input.category")}
                    onChange={(selectedOption: Option | null) => setFormData(prevData => ({
                        ...prevData,
                        category: selectedOption ? selectedOption.value : ''
                    }))}
                    value={product_categories.find(option => option.value === formData.category) || null}
                />
                <YearInput
                    value={formData.productionYear ? formData.productionYear : null}
                    onChange={handleYearChange}
                    minDate={new Date(1900, 0, 1)}
                    maxDate={new Date()}
                />
                <NameInput
                    name="brand"
                    placeholder={t("create_ad.input.brand")}
                    value={formData.brand || ''}
                    onChange={handleChange}
                />
                <DescriptionInput
                    value={formData.description}
                    onChange={(description: string) => setFormData(prevData => ({ ...prevData, description }))}
                />
                <ImageUploadBox onUpload={handleImageUpload} title={t("create_ad.choose_image")} />
                <CustomButton
                    text={t("create_ad.create_ad_btn")}
                    type="submit"
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default CreateAdForm;
