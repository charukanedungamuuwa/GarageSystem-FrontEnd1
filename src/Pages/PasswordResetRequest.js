import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const PasswordResetRequest = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/auth/reset-password', {
        email: values.email,
      });
      if (response.status === 200) {
        message.success('Password reset email sent successfully.');
      } else {
        message.error('Failed to send password reset email. Please try again.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Password reset request error:', error);
      message.error('Failed to send password reset email. Please try again.');
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        name="password_reset_request"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please enter a valid email address!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className='bg-sky-900'>
            Send Reset Email
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordResetRequest;
