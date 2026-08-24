import { useState } from "react";
import { Card, Form, Input, Button, Typography, message } from "antd";
import {
  LockOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
  HeartFilled,
  LockOutlined as LockIcon,
} from "@ant-design/icons";
import Header from "../components/Header";

const { Title, Text } = Typography;

// ============================================================
// STYLES – matching the app‑wide glass‑morphism UI
// ============================================================
const CHANGE_PASSWORD_STYLES = `
  @keyframes cp-rise-in {
    from { opacity: 0; transform: translateY(22px) scale(.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes cp-orb-drift {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(-23px, 25px, 0) scale(1.1); }
  }

  @keyframes cp-field-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cp-page {
    min-height: 100vh;
    overflow: hidden;
    background:
      radial-gradient(circle at 4% 8%, rgba(216, 240, 255, .92) 0, transparent 27rem),
      radial-gradient(circle at 96% 84%, rgba(255, 229, 243, .78) 0, transparent 30rem),
      #f8faff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
  }

  .cp-shell {
    width: min(1000px, 100%);
    margin: 0 auto;
  }

  .cp-hero {
    position: relative;
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 22px;
    overflow: hidden;
    min-height: 184px;
    margin-bottom: 32px;
    padding: 32px 38px;
    border: 1px solid rgba(255, 255, 255, .88);
    border-radius: 30px;
    background:
      linear-gradient(130deg, rgba(255, 255, 255, .9), rgba(230, 244, 255, .72)),
      #eaf4ff;
    box-shadow: 0 22px 48px rgba(28, 75, 130, .1);
    animation: cp-rise-in 650ms cubic-bezier(.22, 1, .36, 1) both;
  }

  .cp-hero::before,
  .cp-hero::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: cp-orb-drift 8s ease-in-out infinite;
  }

  .cp-hero::before {
    width: 220px;
    height: 220px;
    top: -135px;
    right: 8%;
    background: rgba(22, 119, 255, .15);
  }

  .cp-hero::after {
    width: 114px;
    height: 114px;
    right: 24%;
    bottom: -64px;
    background: rgba(255, 123, 183, .16);
    animation-delay: -4s;
  }

  .cp-hero-copy,
  .cp-hero-note {
    position: relative;
    z-index: 1;
  }

  .cp-kicker {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 11px;
    color: #1677ff;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  .cp-title {
    margin: 0 !important;
    color: #15213a !important;
    font-size: clamp(34px, 4.6vw, 54px) !important;
    font-weight: 800 !important;
    letter-spacing: -.055em;
    line-height: 1 !important;
  }

  .cp-subtitle {
    display: block;
    margin-top: 12px;
    color: #667085 !important;
    font-size: 15px;
  }

  .cp-hero-note {
    display: flex;
    align-items: center;
    gap: 11px;
    min-width: 185px;
    padding: 13px 15px;
    border: 1px solid rgba(255, 255, 255, .9);
    border-radius: 17px;
    background: rgba(255, 255, 255, .76);
    box-shadow: 0 12px 24px rgba(28, 75, 130, .1);
    backdrop-filter: blur(14px);
  }

  .cp-hero-note-icon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
    border-radius: 12px;
    background: #e6f4ff;
    color: #1677ff;
  }

  .cp-hero-note strong,
  .cp-hero-note span {
    display: block;
  }

  .cp-hero-note strong {
    color: #1a3154;
    font-size: 12px;
  }

  .cp-hero-note span {
    margin-top: 2px;
    color: #667085;
    font-size: 11px;
  }

  .cp-main-card {
    overflow: hidden;
    border: 1px solid rgba(220, 231, 246, .92) !important;
    border-radius: 22px !important;
    background: rgba(255, 255, 255, .9) !important;
    box-shadow: 0 16px 36px rgba(28, 75, 130, .08) !important;
    opacity: 0;
    animation: cp-rise-in 600ms 120ms cubic-bezier(.22, 1, .36, 1) forwards;
  }

  .cp-main-card .ant-card-head {
    min-height: 68px;
    padding: 0 21px;
    border-bottom: 1px solid #dce7f6;
  }

  .cp-main-card .ant-card-head-title {
    padding: 16px 0;
  }

  .cp-main-card .ant-card-body {
    padding: 24px 28px;
  }

  .cp-card-heading {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #15213a;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -.025em;
  }

  .cp-card-icon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 12px;
    background: #e6f4ff;
    color: #1677ff;
  }

  .cp-form .stagger-item {
    opacity: 0;
  }

  .cp-form .stagger-item.visible {
    animation: cp-field-in 380ms cubic-bezier(.22, 1, .36, 1) forwards;
  }

  .cp-form .stagger-item:nth-child(1) { animation-delay: 80ms; }
  .cp-form .stagger-item:nth-child(2) { animation-delay: 130ms; }
  .cp-form .stagger-item:nth-child(3) { animation-delay: 180ms; }
  .cp-form .stagger-item:nth-child(4) { animation-delay: 230ms; }

  .cp-form .ant-input-affix-wrapper,
  .cp-form .ant-input {
    transition: box-shadow 200ms ease, border-color 200ms ease, transform 150ms ease;
  }

  .cp-form .ant-input-affix-wrapper:hover,
  .cp-form .ant-input:hover {
    transform: translateY(-1px);
  }

  .cp-update-btn.ant-btn {
    height: 46px;
    border: none;
    border-radius: 13px;
    background: linear-gradient(135deg, #55b5ff, #1677ff 60%, #0958d9);
    box-shadow: 0 12px 22px rgba(22, 119, 255, .24);
    font-weight: 700;
    color: #fff !important;
    transition: transform 180ms ease, box-shadow 180ms ease;
  }

  .cp-update-btn.ant-btn:hover:not(:disabled) {
    box-shadow: 0 16px 28px rgba(22, 119, 255, .34);
    transform: translateY(-2px);
  }

  .cp-update-btn.ant-btn:disabled {
    background: #c7d1df;
    box-shadow: none;
  }

  .cp-back-btn.ant-btn {
    display: inline-flex;
    height: 46px;
    align-items: center;
    gap: 7px;
    padding: 0 18px;
    border: 1px solid #dce7f6;
    border-radius: 13px;
    background: rgba(255, 255, 255, .7);
    color: #4a5a72;
    font-weight: 600;
    transition: background 180ms ease, transform 180ms ease, border-color 180ms ease;
  }

  .cp-back-btn.ant-btn:hover {
    border-color: #1677ff;
    background: #e6f4ff !important;
    color: #0958d9 !important;
    transform: translateX(-3px);
  }

  .cp-actions {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  @media (max-width: 640px) {
    .cp-hero {
      min-height: 0;
      padding: 27px 23px;
      border-radius: 24px;
    }

    .cp-hero-note {
      display: none;
    }

    .cp-main-card .ant-card-body {
      padding: 18px 16px;
    }

    .cp-form .stagger-item {
      animation-delay: 0ms !important;
    }

    .cp-actions {
      flex-direction: column;
    }

    .cp-back-btn,
    .cp-update-btn {
      width: 100%;
      justify-content: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cp-hero,
    .cp-hero::before,
    .cp-hero::after,
    .cp-main-card,
    .cp-form .stagger-item {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }

    .cp-update-btn.ant-btn:hover,
    .cp-back-btn.ant-btn:hover {
      transform: none !important;
    }
  }
`;

function ChangePassword() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [staggerReady, setStaggerReady] = useState(false);

  // Auto‑trigger staggered animations after mount
  useState(() => {
    const timer = setTimeout(() => setStaggerReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const onFinish = (values) => {
    if (values.new_password !== values.confirm_password) {
      message.error("New Password and Confirm Password do not match.");
      return;
    }

    setLoading(true);

    // API Integration Later
    console.log(values);

    setTimeout(() => {
      message.success("Password Changed Successfully");
      setLoading(false);
      window.location.href = "http://localhost:5178/profile";
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="cp-page">
        <style>{CHANGE_PASSWORD_STYLES}</style>

        <div className="cp-shell">
          {/* HERO */}
          <section className="cp-hero">
            <div className="cp-hero-copy">
              <span className="cp-kicker">
                <HeartFilled /> Secure update
              </span>
              <Title level={1} className="cp-title">
                Change Password
              </Title>
              <Text className="cp-subtitle">
                Update your account password to keep it secure.
              </Text>
            </div>

            <div className="cp-hero-note">
              <span className="cp-hero-note-icon">
                <LockIcon />
              </span>
              <span>
                <strong>Password update</strong>
                <span>Your credentials are encrypted</span>
              </span>
            </div>
          </section>

          {/* CARD */}
          <Card
            className="cp-main-card"
            title={
              <span className="cp-card-heading">
                <span className="cp-card-icon">
                  <LockOutlined />
                </span>
                Change Password
              </span>
            }
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="cp-form"
            >
              <Form.Item
                className={`stagger-item ${staggerReady ? "visible" : ""}`}
                label="Current Password"
                name="old_password"
                rules={[{ required: true, message: "Enter current password" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter current password"
                  size="large"
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item
                className={`stagger-item ${staggerReady ? "visible" : ""}`}
                label="New Password"
                name="new_password"
                rules={[
                  { required: true, message: "Enter new password" },
                  {
                    min: 8,
                    message: "Password must contain at least 8 characters",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter new password"
                  size="large"
                  autoComplete="new-password"
                />
              </Form.Item>

              <Form.Item
                className={`stagger-item ${staggerReady ? "visible" : ""}`}
                label="Confirm Password"
                name="confirm_password"
                rules={[{ required: true, message: "Confirm your password" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Re‑enter new password"
                  size="large"
                  autoComplete="new-password"
                />
              </Form.Item>

              <div className={`stagger-item ${staggerReady ? "visible" : ""}`}>
                <div className="cp-actions">
                  <Button
                    icon={<ArrowLeftOutlined />}
                    className="cp-back-btn"
                    onClick={() =>
                      (window.location.href = "http://localhost:5178/profile")
                    }
                  >
                    Back
                  </Button>

                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    icon={<SaveOutlined />}
                    className="cp-update-btn"
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
