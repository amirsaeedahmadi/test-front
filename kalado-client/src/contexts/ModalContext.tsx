import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts';

interface ModalContextType {
    isLoginVisible: boolean;
    isForgetPasswordVisible: boolean;
    isResetPasswordVisible: boolean;
    isSignupVisible: boolean;
    isCodeVerificationVisible: boolean;
    isCreateAdVisible: boolean;
    isReportSubmissionVisible: boolean;
    isInProfile: boolean;
    isProductDetailsOpen: boolean;
    setLoginVisible: (visible: boolean) => void;
    setForgetPasswordVisible: (visible: boolean) => void;
    setResetPasswordVisible: (visible: boolean) => void;
    setSignupVisible: (visible: boolean) => void;
    setCodeVerificationVisible: (visible: boolean) => void;
    setCreateAdVisible: (visible: boolean) => void;
    setReportSubmissionVisible: (visible: boolean) => void;
    setIsInProfile: (visible: boolean) => void;
    setProductDetailsOpen: (visible: boolean) => void;
    handleOpenLogin: () => void;
    handleOpenForgetPassword: () => void;
    handleOpenResetPassword: () => void;
    handleOpenSignup: () => void;
    handleOpenCodeVerification: () => void;
    handleOpenCreateAd: () => void;
    handleOpenReportSubmission: () => void;
    handleOpenProfilePage: () => void;
    handleClosePopups: () => void;
    handleLogoutClick: () => void;
    handlePopState: () => void;
    handleProductDetailsClick: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { token, setToken, role, setRole } = useAuth();
    const [isLoginVisible, setLoginVisible] = useState(false);
    const [isForgetPasswordVisible, setForgetPasswordVisible] = useState(false);
    const [isResetPasswordVisible, setResetPasswordVisible] = useState(false);
    const [isSignupVisible, setSignupVisible] = useState(false);
    const [isCodeVerificationVisible, setCodeVerificationVisible] = useState(false);
    const [isCreateAdVisible, setCreateAdVisible] = useState(false);
    const [isReportSubmissionVisible, setReportSubmissionVisible] = useState(false);
    const [isInProfile, setIsInProfile] = useState(false);
    const [isProductDetailsOpen, setProductDetailsOpen] = useState(false);

    const handleClosePopups = () => {
        setLoginVisible(false);
        setForgetPasswordVisible(false);
        setResetPasswordVisible(false);
        setSignupVisible(false);
        setCreateAdVisible(false);
        setCodeVerificationVisible(false);
        setReportSubmissionVisible(false);
        setProductDetailsOpen(false);
    };

    const handleOpenLogin = () => {
        setLoginVisible(true);
        setSignupVisible(false);
    };

    const handleOpenForgetPassword = () => {
        setForgetPasswordVisible(true);
        setLoginVisible(false);
    };

    const handleOpenResetPassword = () => {
        setResetPasswordVisible(true);
        setForgetPasswordVisible(false);
    }

    const handleOpenSignup = () => {
        setSignupVisible(true);
        setLoginVisible(false);
    };

    const handleOpenCodeVerification = () => {
        handleClosePopups();
        setCodeVerificationVisible(true);
    };

    const handleOpenCreateAd = () => {
        if (token == null) {
            toast.error(t("error.create_ad.disable_not_loggined"));
            return;
        }
        setCreateAdVisible(true);
    };

    const handleOpenReportSubmission = () => {
        if (token == null) {
            toast.error(t("error.item_details.disable_report_submission"));
            return;
        }
        setReportSubmissionVisible(true);
    };

    const handleOpenProfilePage = () => {
        console.log(role);
        setIsInProfile(true);
        if (role === 'USER') {
            navigate('/user-dashboard');
        } else {
            navigate('/admin-dashboard');
        }
    };

    const handleLogoutClick = () => {
        setIsInProfile(false);
        setToken(null);
        setRole('USER');
        localStorage.setItem('token', '');
        navigate('/');
    };

    const handlePopState = () => {
        setIsInProfile(false);
        navigate('/');
    };

    const handleProductDetailsClick = () => {
        setProductDetailsOpen(true);
    }

    useEffect(() => {
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return (
        <ModalContext.Provider value={{
            isLoginVisible,
            isForgetPasswordVisible,
            isResetPasswordVisible,
            isSignupVisible,
            isCodeVerificationVisible,
            isCreateAdVisible,
            isReportSubmissionVisible,
            isInProfile,
            isProductDetailsOpen,
            setLoginVisible,
            setForgetPasswordVisible,
            setResetPasswordVisible,
            setSignupVisible,
            setCodeVerificationVisible,
            setCreateAdVisible,
            setReportSubmissionVisible,
            setIsInProfile,
            setProductDetailsOpen,
            handleOpenLogin,
            handleOpenForgetPassword,
            handleOpenResetPassword,
            handleOpenSignup,
            handleOpenCodeVerification,
            handleOpenCreateAd,
            handleOpenReportSubmission,
            handleOpenProfilePage,
            handleClosePopups,
            handleLogoutClick,
            handlePopState,
            handleProductDetailsClick
        }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};
