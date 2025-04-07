import React, { useState } from "react";
import { sendOTP, verifyOTP } from "../features/phoneAuth";
import { ConfirmationResult } from "firebase/auth";

const PhoneAuthForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleSendOTP = async () => {
    try {
      const result = await sendOTP(phoneNumber);
      setConfirmationResult(result);
      setIsOtpSent(true);
      alert("OTP sent ✅");
    } catch (error) {
      alert("Failed to send OTP ❌");
      console.error(error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      if (confirmationResult) {
        const signedInUser = await verifyOTP(confirmationResult, otp);
        setUser(signedInUser);
        alert("OTP verified ✅");
      }
    } catch (error) {
      alert("Invalid OTP ❌");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📱 Phone Authentication</h2>
      {!isOtpSent ? (
        <>
          <input
            type="tel"
            placeholder="+91XXXXXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={handleSendOTP}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOTP}>Verify OTP</button>
        </>
      )}
      <div id="recaptcha-container" />
    </div>
  );
};

export default PhoneAuthForm;
