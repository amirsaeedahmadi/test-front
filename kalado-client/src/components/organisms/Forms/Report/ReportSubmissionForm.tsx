import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, DescriptionInput, CustomButton, FormError } from '../../../atoms';
import { PopupBox, ImageUploadBox } from '../../../molecules';
import { createReportWithImages } from '../../../../api/services/ReportService';
import { toast } from 'react-toastify';
import { useModalContext } from '../../../../contexts';
import { OptionsComponent } from '../../../../constants/options';
import { ReportData } from '../../../../constants/apiTypes';
import { useAuth } from '../../../../contexts';


interface ReportSubmissionFormProps {
    reportedContentId?: number;
}

const ReportSubmissionForm: React.FC<ReportSubmissionFormProps> = ({ reportedContentId }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<ReportData>({
        violationType: '',
        description: '',
        reportedContentId,
    });
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<string>('');
    const { report_options } = OptionsComponent();
    const { isReportSubmissionVisible, handleClosePopups } = useModalContext();
    const { token } = useAuth();

    if (!report_options) {
        console.error('report_options is undefined or null');
    }

    const handleCategoryChange = (selectedOption: { value: string; label: string } | null) => {
        setFormData((prevData) => ({
            ...prevData,
            violationType: selectedOption ? selectedOption.value : '',
        }));
    };

    const handleDescriptionChange = (description: string) => {
        setFormData((prevData) => ({
            ...prevData,
            description,
        }));
    };

    const handleImageUpload = (files: File[]) => {
        setImages(files);
    };

    const handleClose = () => {
        setFormData({
            violationType: '',
            description: '',
            reportedContentId,
        });
        setImages([]);
        setError('');
        handleClosePopups();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.violationType) {
            setError(t("report.error.missing_violation_type"));
            return;
        }
        if (!formData.description.trim() && images.length === 0) {
            setError(t("report.error.missing_description_or_image"));
            return;
        }

        const response = await createReportWithImages(formData, images);
        if (response.isSuccess) {
            handleClose();
            toast(t("report.success.report_submitted"));
        } else {
            setError(t("report.error.submission_failed"));
        }
    };

    return (
        <PopupBox open={isReportSubmissionVisible} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                {report_options ? (
                    <Dropdown
                        options={report_options}
                        placeholder={t("report.input.category")}
                        onChange={handleCategoryChange}
                        value={report_options.find((option) => option.value === formData.violationType) || null}
                        isRequired={true}
                    />
                ) : (
                    <p>{t("report_options is unavailable")}</p>
                )}
                <DescriptionInput
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    placeholder={t("report.input.description")}
                />
                <ImageUploadBox
                    onUpload={handleImageUpload}
                    title={t("report.choose_evidence")}
                />
                <CustomButton
                    text={t("item_details.report_submission_btn")}
                    type="submit"
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default ReportSubmissionForm;