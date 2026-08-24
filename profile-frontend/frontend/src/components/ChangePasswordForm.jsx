import { Form, Input, Button, Space } from "antd";
import {
  LockOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

function ChangePasswordForm({ form, onFinish, loading }) {
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Current Password"
        name="old_password"
        rules={[
          {
            required: true,
            message: "Please enter your current password",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Current Password"
        />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="new_password"
        rules={[
          {
            required: true,
            message: "Please enter a new password",
          },
          {
            min: 8,
            message: "Password must be at least 8 characters",
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirm_password"
        dependencies={["new_password"]}
        rules={[
          {
            required: true,
            message: "Please confirm your password",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("new_password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
        />
      </Form.Item>

      <Space>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() =>
            (window.location.href = "http://localhost:5178/profile")
          }
        >
          Back
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
          loading={loading}
        >
          Update Password
        </Button>
      </Space>
    </Form>
  );
}

export default ChangePasswordForm;
