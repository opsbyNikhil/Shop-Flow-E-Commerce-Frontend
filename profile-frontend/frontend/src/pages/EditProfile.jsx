import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  Select,
  DatePicker,
  Typography,
  Row,
  Col,
  message,
} from "antd";
import {
  UploadOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
  HeartFilled,
  UserOutlined,
  LockOutlined as LockIcon,
} from "@ant-design/icons";
import Header from "../components/Header";

const { Title, Text } = Typography;
const { TextArea } = Input;

// ============================================================
// STYLES – matching the app‑wide glass‑morphism UI
// ============================================================
const EDIT_PROFILE_STYLES = `
  @keyframes ep-rise-in {
    from { opacity: 0; transform: translateY(22px) scale(.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes ep-orb-drift {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(-23px, 25px, 0) scale(1.1); }
  }

  @keyframes ep-field-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .ep-page {
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

  .ep-shell {
    width: min(1000px, 100%);
    margin: 0 auto;
  }

  .ep-hero {
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
    animation: ep-rise-in 650ms cubic-bezier(.22, 1, .36, 1) both;
  }

  .ep-hero::before,
  .ep-hero::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: ep-orb-drift 8s ease-in-out infinite;
  }

  .ep-hero::before {
    width: 220px;
    height: 220px;
    top: -135px;
    right: 8%;
    background: rgba(22, 119, 255, .15);
  }

  .ep-hero::after {
    width: 114px;
    height: 114px;
    right: 24%;
    bottom: -64px;
    background: rgba(255, 123, 183, .16);
    animation-delay: -4s;
  }

  .ep-hero-copy,
  .ep-hero-note {
    position: relative;
    z-index: 1;
  }

  .ep-kicker {
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

  .ep-title {
    margin: 0 !important;
    color: #15213a !important;
    font-size: clamp(34px, 4.6vw, 54px) !important;
    font-weight: 800 !important;
    letter-spacing: -.055em;
    line-height: 1 !important;
  }

  .ep-subtitle {
    display: block;
    margin-top: 12px;
    color: #667085 !important;
    font-size: 15px;
  }

  .ep-hero-note {
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

  .ep-hero-note-icon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
    border-radius: 12px;
    background: #e6f4ff;
    color: #1677ff;
  }

  .ep-hero-note strong,
  .ep-hero-note span {
    display: block;
  }

  .ep-hero-note strong {
    color: #1a3154;
    font-size: 12px;
  }

  .ep-hero-note span {
    margin-top: 2px;
    color: #667085;
    font-size: 11px;
  }

  .ep-main-card {
    overflow: hidden;
    border: 1px solid rgba(220, 231, 246, .92) !important;
    border-radius: 22px !important;
    background: rgba(255, 255, 255, .9) !important;
    box-shadow: 0 16px 36px rgba(28, 75, 130, .08) !important;
    opacity: 0;
    animation: ep-rise-in 600ms 120ms cubic-bezier(.22, 1, .36, 1) forwards;
  }

  .ep-main-card .ant-card-head {
    min-height: 68px;
    padding: 0 21px;
    border-bottom: 1px solid #dce7f6;
  }

  .ep-main-card .ant-card-head-title {
    padding: 16px 0;
  }

  .ep-main-card .ant-card-body {
    padding: 24px 28px;
  }

  .ep-card-heading {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #15213a;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -.025em;
  }

  .ep-card-icon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 12px;
    background: #e6f4ff;
    color: #1677ff;
  }

  .ep-form .stagger-item {
    opacity: 0;
  }

  .ep-form .stagger-item.visible {
    animation: ep-field-in 380ms cubic-bezier(.22, 1, .36, 1) forwards;
  }

  .ep-form .stagger-item:nth-child(1) { animation-delay: 80ms; }
  .ep-form .stagger-item:nth-child(2) { animation-delay: 130ms; }
  .ep-form .stagger-item:nth-child(3) { animation-delay: 180ms; }
  .ep-form .stagger-item:nth-child(4) { animation-delay: 230ms; }
  .ep-form .stagger-item:nth-child(5) { animation-delay: 280ms; }
  .ep-form .stagger-item:nth-child(6) { animation-delay: 330ms; }
  .ep-form .stagger-item:nth-child(7) { animation-delay: 380ms; }
  .ep-form .stagger-item:nth-child(8) { animation-delay: 430ms; }
  .ep-form .stagger-item:nth-child(9) { animation-delay: 480ms; }

  .ep-form .ant-input,
  .ep-form .ant-input-affix-wrapper,
  .ep-form .ant-select-selector,
  .ep-form .ant-picker {
    border-radius: 10px !important;
    border-color: #dce7f6 !important;
    transition: border-color 200ms ease, box-shadow 200ms ease, transform 150ms ease;
  }

  .ep-form .ant-input:hover,
  .ep-form .ant-input-affix-wrapper:hover,
  .ep-form .ant-select-selector:hover,
  .ep-form .ant-picker:hover {
    border-color: #1677ff !important;
    transform: translateY(-1px);
  }

  .ep-form .ant-input:focus,
  .ep-form .ant-input-affix-wrapper:focus,
  .ep-form .ant-select-selector:focus,
  .ep-form .ant-picker:focus {
    border-color: #1677ff !important;
    box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.16) !important;
  }

  .ep-upload-btn.ant-btn {
    height: 40px;
    border-radius: 10px;
    border: 1px dashed #dce7f6;
    background: transparent;
    color: #4a5a72;
    font-weight: 600;
    transition: border-color 180ms ease, color 180ms ease, background 180ms ease;
  }

  .ep-upload-btn.ant-btn:hover {
    border-color: #1677ff;
    color: #1677ff;
    background: rgba(22, 119, 255, 0.04);
  }

  .ep-upload-btn .anticon {
    color: #1677ff;
  }

  .ep-save-btn.ant-btn {
    height: 46px;
    border: none;
    border-radius: 13px;
    background: linear-gradient(135deg, #55b5ff, #1677ff 60%, #0958d9);
    box-shadow: 0 12px 22px rgba(22, 119, 255, .24);
    font-weight: 700;
    color: #fff !important;
    transition: transform 180ms ease, box-shadow 180ms ease;
  }

  .ep-save-btn.ant-btn:hover:not(:disabled) {
    box-shadow: 0 16px 28px rgba(22, 119, 255, .34);
    transform: translateY(-2px);
  }

  .ep-save-btn.ant-btn:disabled {
    background: #c7d1df;
    box-shadow: none;
  }

  .ep-back-btn.ant-btn {
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

  .ep-back-btn.ant-btn:hover {
    border-color: #1677ff;
    background: #e6f4ff !important;
    color: #0958d9 !important;
    transform: translateX(-3px);
  }

  .ep-actions {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  @media (max-width: 640px) {
    .ep-hero {
      min-height: 0;
      padding: 27px 23px;
      border-radius: 24px;
    }

    .ep-hero-note {
      display: none;
    }

    .ep-main-card .ant-card-body {
      padding: 18px 16px;
    }

    .ep-form .stagger-item {
      animation-delay: 0ms !important;
    }

    .ep-actions {
      flex-direction: column;
    }

    .ep-back-btn,
    .ep-save-btn {
      width: 100%;
      justify-content: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ep-hero,
    .ep-hero::before,
    .ep-hero::after,
    .ep-main-card,
    .ep-form .stagger-item {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }

    .ep-save-btn.ant-btn:hover,
    .ep-back-btn.ant-btn:hover {
      transform: none !important;
    }
  }
`;

function EditProfile() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [staggerReady, setStaggerReady] = useState(false);

  // Auto‑trigger staggered animations after mount
  useState(() => {
    const timer = setTimeout(() => setStaggerReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (values) => {
    setLoading(true);
    console.log(values);
    message.success("Profile Updated Successfully");
    setTimeout(() => {
      setLoading(false);
      window.location.href = "http://localhost:5178/profile";
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="ep-page">
        <style>{EDIT_PROFILE_STYLES}</style>

        <div className="ep-shell">
          {/* HERO */}
          <section className="ep-hero">
            <div className="ep-hero-copy">
              <span className="ep-kicker">
                <HeartFilled /> Update your profile
              </span>
              <Title level={1} className="ep-title">
                Edit Profile
              </Title>
              <Text className="ep-subtitle">
                Update your personal information and address details.
              </Text>
            </div>

            <div className="ep-hero-note">
              <span className="ep-hero-note-icon">
                <LockIcon />
              </span>
              <span>
                <strong>Profile update</strong>
                <span>Your information is secure</span>
              </span>
            </div>
          </section>

          {/* CARD */}
          <Card
            className="ep-main-card"
            title={
              <span className="ep-card-heading">
                <span className="ep-card-icon">
                  <UserOutlined />
                </span>
                Personal Details
              </span>
            }
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="ep-form"
            >
              <Row gutter={[20, 0]}>
                {/* Profile Image */}
                <Col
                  span={24}
                  className={`stagger-item ${staggerReady ? "visible" : ""}`}
                >
                  <Form.Item label="Profile Image" name="profile_image">
                    <Upload listType="picture" beforeUpload={() => false}>
                      <Button
                        icon={<UploadOutlined />}
                        className="ep-upload-btn"
                      >
                        Choose Image
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>

                {/* Date of Birth */}
                <Col
                  xs={24}
                  sm={12}
                  className={`stagger-item ${staggerReady ? "visible" : ""}`}
                >
                  <Form.Item label="Date of Birth" name="date_of_birth">
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="Select date"
                      format="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>

                {/* Gender */}
                <Col
                  xs={24}
                  sm={12}
                  className={`stagger-item ${staggerReady ? "visible" : ""}`}
                >
                  <Form.Item label="Gender" name="gender">
                    <Select
                      placeholder="Select Gender"
                      options={[
                        { label: "Male", value: "Male" },
                        { label: "Female", value: "Female" },
                        { label: "Other", value: "Other" },
                      ]}
                    />
                  </Form.Item>
                </Col>

                {/* Address */}
                <Col
                  span={24}
                  className={`stagger-item ${staggerReady ? "visible" : ""}`}
                >
                  <Form.Item label="Address" name="address">
                    <TextArea rows={4} placeholder="Enter your address" />
                  </Form.Item>
                </Col>

                {/* City */}
                <Col
                  xs={24}
                  sm={12}
                  className={`stagger-item ${staggerReady ? "visible" : ""}`}
                >
                  <Form.Item label="City" name="city">
                    <Input placeholder="Enter city" />
                  </Form.Item>
                </Col>

                {/* State */}
                <Col
                  xs={24}
                  sm={12}
                  className={`stagger-item ${staggerReady ? "visible" : ""}`}
                >
                  <Form.Item label="State" name="state">
                    <Input placeholder="Enter state" />
                  </Form.Item>
                </Col>

                {/* Country */}
                <Col
                  xs={24}
                  sm={12}
                  className={`stagger-item ${staggerReady ? "visible" : ""}`}
                >
                  <Form.Item label="Country" name="country">
                    <Input placeholder="Enter country" />
                  </Form.Item>
                </Col>

                {/* Pincode */}
                <Col
                  xs={24}
                  sm={12}
                  className={`stagger-item ${staggerReady ? "visible" : ""}`}
                >
                  <Form.Item label="Pincode" name="pincode">
                    <Input placeholder="Enter pincode" />
                  </Form.Item>
                </Col>

                {/* Actions */}
                <Col
                  span={24}
                  className={`stagger-item ${staggerReady ? "visible" : ""}`}
                >
                  <div className="ep-actions">
                    <Button
                      icon={<ArrowLeftOutlined />}
                      className="ep-back-btn"
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
                      className="ep-save-btn"
                    >
                      Save Changes
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
