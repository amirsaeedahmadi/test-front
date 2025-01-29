import React from 'react';
import LoginForm from './Login/LoginForm';
import ResetPasswordForm from './Login/ResetPasswordForm';
import SignupForm from './Register/SignupForm';
import CodeVerificationForm from './Register/CodeVerificationForm';
import CreateAdForm from './CreateAd/CreateAdForm';


const FormGroup: React.FC = () => {
    return (
        <>
            <LoginForm />
            <ResetPasswordForm />
            <SignupForm />
            <CodeVerificationForm />
            <CreateAdForm />
        </>
    );
};

export default FormGroup;
