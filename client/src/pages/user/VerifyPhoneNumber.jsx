import React from 'react'
import {auth} from "@/ultils/firebase"
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth"

const VerifyPhoneNumber = () => {
    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            'recaptcha-container', // ID của container để hiển thị reCAPTCHA
            { size: 'invisible' },
            auth
        );
    };
    
    const sendOTP = (phoneNumber) => {
        setupRecaptcha();
    
        const appVerifier = window.recaptchaVerifier;
    
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                alert('OTP đã được gửi!');
            })
            .catch((error) => {
                console.error('Lỗi khi gửi OTP:', error);
            });
    };
  return (
    <div>
      
    </div>
  )
}

export default VerifyPhoneNumber
