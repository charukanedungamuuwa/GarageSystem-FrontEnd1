// src/pages/PasswordResetPage.js
import React from "react";
import { useParams } from "react-router-dom";
import PasswordReset from "../Pages/PasswordReset";

const PasswordResetPage = () => {
  const { token } = useParams();

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
      <PasswordReset token={token} />
    </div>
  );
};

export default PasswordResetPage;
