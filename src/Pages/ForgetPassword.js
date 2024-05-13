// src/components/ForgetPassword.js
import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";

const { Title } = Typography;

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to send a reset password link to the email
    setIsSubmitted(true);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <Title level={2}>Forget Password</Title>
      {isSubmitted ? (
        <div>
          <p>
            A password reset link has been sent to <strong>{email}</strong>.
          </p>
          <p>Please check your email to reset your password.</p>
        </div>
      ) : (
        <Form onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email!",
              },
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ForgetPassword;