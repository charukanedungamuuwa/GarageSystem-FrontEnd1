// src/components/PasswordReset.js (Continued)
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const PasswordReset = ({ token }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/reset-password/confirm",
        {
          ...values,
          token,
        }
      );
      console.log("Password reset successful:", response.data);
      message.success("Password reset successful");
      setLoading(false);
      // Optionally, show a success message to the user
    } catch (error) {
      console.error("Password reset error:", error);
      setLoading(false);
      // Handle error, maybe show a message to the user
    }
  };
  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject("Please input your Password!");
    }
  
    // Regular expressions to check for different criteria
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);
  
    if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && value.length >= 8)) {
      return Promise.reject(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      );
    }
  
    return Promise.resolve();
  };
  return (
    <Form
      name="password_reset"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="password"
        label="New Password"
        rules={[
          {
            required: true,
            message: "Please enter your new password",
          },
          {
            validator: validatePassword,
          },
        ]}
      >
        <Input.Password placeholder="Enter new password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please confirm your new password",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords do not match")
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm new password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} className="bg-sky-900">
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordReset;
