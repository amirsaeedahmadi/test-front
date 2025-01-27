import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts';

interface ModalContextType {
    isLoginVisible: boolean;
    isForgetPasswordVisible: boolean;
    isSignupVisible: boolean;
    isCodeVerificationVisible: boolean;
    isCreateAdVisible: boolean;
    isReportSubmissionVisible: boolean;
    isInProfile: boolean;
    setLoginVisible: (visible: boolean) => void;
    setSignupVisible: (visible: boolean) => void;
    setCodeVerificationVisible: (visible: boolean) => void;
    setCreateAdVisible: (visible: boolean) => void;
    setReportSubmissionVisible: (visible: boolean) => void;
    setIsInProfile: (visible: boolean) => void;
    handleOpenLogin: () => void;
    handleOpenForgetPassword: () => void;
    handleOpenSignup: () => void;
    handleOpenCodeVerification: () => void;
    handleOpenCreateAd: () => void;
    handleOpenReportSubmission: () => void;
    handleOpenProfilePage: () => void;
    handleClosePopups: () => void;
    handleLogoutClick: () => void;
    handlePopState: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { token, setToken, role, setRole } = useAuth();
    const [isLoginVisible, setLoginVisible] = useState(false);
    const [isForgetPasswordVisible, setForgetPasswordVisible] = useState(false);
    const [isSignupVisible, setSignupVisible] = useState(false);
    const [isCodeVerificationVisible, setCodeVerificationVisible] = useState(false);
    const [isCreateAdVisible, setCreateAdVisible] = useState(false);
    const [isReportSubmissionVisible, setReportSubmissionVisible] = useState(false);
    const [isInProfile, setIsInProfile] = useState(false);

    const handleClosePopups = () => {
        setLoginVisible(false);
        setForgetPasswordVisible(false);
        setSignupVisible(false);
        setCreateAdVisible(false);
        setCodeVerificationVisible(false);
        setReportSubmissionVisible(false)
    };

    const handleOpenLogin = () => {
        setLoginVisible(true);
        setSignupVisible(false);
    };

    const handleOpenForgetPassword = () => {
        setForgetPasswordVisible(true);
        setLoginVisible(false);
    };

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
        console.log("handleOpenReportSubmission")
        console.log(token);
        if (token == null) {
            toast.error(t("error.item_details.disable_report_submiision"));
            return;
        }
        setReportSubmissionVisible(true);
    };

    const handleOpenProfilePage = () => {
        console.log("handleOpenProfilePage");
        console.log(role);
        console.log(token);
        setIsInProfile(true);
        if (role === 'ADMIN') {
            navigate('/admin-dashboard');
        } else if (role === 'USER') {
            navigate('/user-dashboard');
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
            isSignupVisible,
            isCodeVerificationVisible,
            isCreateAdVisible,
            isReportSubmissionVisible,
            isInProfile,
            setLoginVisible,
            setSignupVisible,
            setCodeVerificationVisible,
            setCreateAdVisible,
            setReportSubmissionVisible,
            setIsInProfile,
            handleOpenLogin,
            handleOpenForgetPassword,
            handleOpenSignup,
            handleOpenCodeVerification,
            handleOpenCreateAd,
            handleOpenReportSubmission,
            handleOpenProfilePage,
            handleClosePopups,
            handleLogoutClick,
            handlePopState,
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
