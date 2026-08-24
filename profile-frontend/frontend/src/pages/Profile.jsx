import { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Row,
  Col,
  Divider,
  Button,
  Spin,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  LockOutlined,
  HeartFilled,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Header from "../components/Header";

const { Title, Text } = Typography;

// ============================================================
// STYLES – matching the app‑wide glass‑morphism UI
// ============================================================
const PROFILE_PAGE_STYLES = `
  @keyframes pp-rise-in {
    from { opacity: 0; transform: translateY(22px) scale(.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes pp-orb-drift {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(-23px, 25px, 0) scale(1.1); }
  }

  @keyframes pp-field-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pp-page {
    min-height: 100vh;
    overflow: hidden;
    background:
      radial-gradient(circle at 4% 8%, rgba(216, 240, 255, .92) 0, transparent 27rem),
      radial-gradient(circle at 96% 84%, rgba(255, 229, 243, .78) 0, transparent 30rem),
      #f8faff;
    padding: 40px 24px;
  }

  .pp-shell {
    width: min(1000px, 100%);
    margin: 0 auto;
  }

  .pp-hero {
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
    animation: pp-rise-in 650ms cubic-bezier(.22, 1, .36, 1) both;
  }

  .pp-hero::before,
  .pp-hero::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: pp-orb-drift 8s ease-in-out infinite;
  }

  .pp-hero::before {
    width: 220px;
    height: 220px;
    top: -135px;
    right: 8%;
    background: rgba(22, 119, 255, .15);
  }

  .pp-hero::after {
    width: 114px;
    height: 114px;
    right: 24%;
    bottom: -64px;
    background: rgba(255, 123, 183, .16);
    animation-delay: -4s;
  }

  .pp-hero-copy,
  .pp-hero-note {
    position: relative;
    z-index: 1;
  }

  .pp-kicker {
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

  .pp-title {
    margin: 0 !important;
    color: #15213a !important;
    font-size: clamp(34px, 4.6vw, 54px) !important;
    font-weight: 800 !important;
    letter-spacing: -.055em;
    line-height: 1 !important;
  }

  .pp-subtitle {
    display: block;
    margin-top: 12px;
    color: #667085 !important;
    font-size: 15px;
  }

  .pp-hero-note {
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

  .pp-hero-note-icon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
    border-radius: 12px;
    background: #e6f4ff;
    color: #1677ff;
  }

  .pp-hero-note strong,
  .pp-hero-note span {
    display: block;
  }

  .pp-hero-note strong {
    color: #1a3154;
    font-size: 12px;
  }

  .pp-hero-note span {
    margin-top: 2px;
    color: #667085;
    font-size: 11px;
  }

  .pp-main-card {
    overflow: hidden;
    border: 1px solid rgba(220, 231, 246, .92) !important;
    border-radius: 22px !important;
    background: rgba(255, 255, 255, .9) !important;
    box-shadow: 0 16px 36px rgba(28, 75, 130, .08) !important;
    opacity: 0;
    animation: pp-rise-in 600ms 120ms cubic-bezier(.22, 1, .36, 1) forwards;
  }

  .pp-main-card .ant-card-body {
    padding: 28px 32px;
  }

  .pp-stagger-item {
    opacity: 0;
  }

  .pp-stagger-item.visible {
    animation: pp-field-in 420ms cubic-bezier(.22, 1, .36, 1) forwards;
  }

  .pp-stagger-left { animation-delay: 80ms; }
  .pp-stagger-right { animation-delay: 180ms; }

  .pp-avatar-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }

  .pp-avatar {
    border: 3px solid #fff;
    box-shadow: 0 8px 20px rgba(28, 75, 130, .15);
  }

  .pp-name {
    margin: 0 0 4px !important;
    color: #15213a !important;
    font-size: 22px !important;
    font-weight: 800 !important;
    letter-spacing: -.03em;
  }

  .pp-username {
    display: block;
    color: #667085 !important;
    font-size: 14px;
  }

  .pp-divider {
    margin: 20px 0 16px;
    border-color: #e8f0f9;
  }

  .pp-edit-btn.ant-btn,
  .pp-password-btn.ant-btn {
    height: 44px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 14px;
    width: 100%;
    margin-top: 8px;
    transition: transform 180ms ease, box-shadow 180ms ease;
  }

  .pp-edit-btn.ant-btn {
    border: none;
    background: linear-gradient(135deg, #55b5ff, #1677ff 60%, #0958d9);
    box-shadow: 0 10px 20px rgba(22, 119, 255, .24);
    color: #fff !important;
  }

  .pp-edit-btn.ant-btn:hover {
    box-shadow: 0 14px 28px rgba(22, 119, 255, .34);
    transform: translateY(-2px);
  }

  .pp-password-btn.ant-btn {
    border: 1px solid #dce7f6;
    background: rgba(255, 255, 255, .7);
    color: #4a5a72;
  }

  .pp-password-btn.ant-btn:hover {
    border-color: #1677ff;
    background: #e6f4ff !important;
    color: #0958d9 !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(22, 119, 255, .12);
  }

  .pp-info-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .06em;
    color: #8c9ab0;
    margin-bottom: 3px;
  }

  .pp-info-value {
    display: block;
    font-size: 15px;
    font-weight: 500;
    color: #15213a;
    padding: 6px 0 10px;
    border-bottom: 1px solid #f0f4fa;
  }

  .pp-info-value .anticon {
    color: #1677ff;
    margin-right: 8px;
  }

  .pp-info-value:last-of-type {
    border-bottom: none;
  }

  .pp-section-title {
    margin: 0 0 4px !important;
    color: #15213a !important;
    font-weight: 700 !important;
  }

  .pp-loading {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background:
      radial-gradient(circle at 4% 8%, rgba(216, 240, 255, .92) 0, transparent 27rem),
      radial-gradient(circle at 96% 84%, rgba(255, 229, 243, .78) 0, transparent 30rem),
      #f8faff;
  }

  .pp-loading-card {
    width: min(440px, 100%);
    padding: 48px 36px;
    border: 1px solid rgba(220, 231, 246, .92);
    border-radius: 26px;
    background: rgba(255, 255, 255, .84);
    box-shadow: 0 20px 44px rgba(28, 75, 130, .1);
    text-align: center;
  }

  @media (max-width: 768px) {
    .pp-main-card .ant-card-body {
      padding: 20px;
    }

    .pp-hero {
      min-height: 0;
      padding: 27px 23px;
      border-radius: 24px;
    }

    .pp-hero-note {
      display: none;
    }

    .pp-name {
      font-size: 20px !important;
    }
  }

  @media (max-width: 576px) {
    .pp-main-card .ant-card-body {
      padding: 16px;
    }

    .pp-edit-btn.ant-btn,
    .pp-password-btn.ant-btn {
      height: 40px;
      font-size: 13px;
    }

    .pp-info-value {
      font-size: 14px;
      padding: 4px 0 8px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pp-hero,
    .pp-hero::before,
    .pp-hero::after,
    .pp-main-card,
    .pp-stagger-item {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }

    .pp-edit-btn.ant-btn:hover,
    .pp-password-btn.ant-btn:hover {
      transform: none !important;
    }
  }
`;

function Profile() {
  const [loading, setLoading] = useState(false);
  const [staggerReady, setStaggerReady] = useState(false);

  // Dummy data (same as original)
  const [profile] = useState({
    first_name: "Nikhil",
    last_name: "Marati",
    username: "nikhilmarati",
    email: "nikhil@gmail.com",
    mobile: "+91 9876543210",
    date_of_birth: "12 May 2000",
    gender: "Male",
    address: "Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    pincode: "500081",
    profile_image: "",
  });

  // Simulate loading (same as original)
  useEffect(() => {
    setLoading(false);
    // trigger staggered animations after mount
    const timer = setTimeout(() => setStaggerReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="pp-loading">
          <style>{PROFILE_PAGE_STYLES}</style>
          <div className="pp-loading-card">
            <Spin size="large" />
            <Text style={{ display: "block", marginTop: 16, color: "#667085" }}>
              Loading your profile…
            </Text>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="pp-page">
        <style>{PROFILE_PAGE_STYLES}</style>

        <div className="pp-shell">
          {/* HERO */}
          <section className="pp-hero">
            <div className="pp-hero-copy">
              <span className="pp-kicker">
                <HeartFilled /> Your account
              </span>
              <Title level={1} className="pp-title">
                My Profile
              </Title>
              <Text className="pp-subtitle">
                View and manage your personal information.
              </Text>
            </div>

            <div className="pp-hero-note">
              <span className="pp-hero-note-icon">
                <LockOutlined />
              </span>
              <span>
                <strong>Private & secure</strong>
                <span>Your data is protected</span>
              </span>
            </div>
          </section>

          {/* MAIN CARD */}
          <Card className="pp-main-card">
            <Row gutter={[40, 30]} align="top">
              {/* LEFT COLUMN – Avatar & Actions */}
              <Col
                xs={24}
                md={8}
                className={`pp-stagger-item pp-stagger-left ${staggerReady ? "visible" : ""}`}
              >
                <div className="pp-avatar-wrapper">
                  <Avatar
                    size={160}
                    icon={<UserOutlined />}
                    src={profile.profile_image || undefined}
                    className="pp-avatar"
                  />
                </div>

                <Title level={3} className="pp-name">
                  {profile.first_name} {profile.last_name}
                </Title>

                <Text className="pp-username">@{profile.username}</Text>

                <Divider className="pp-divider" />

                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  className="pp-edit-btn"
                  onClick={() =>
                    (window.location.href =
                      "http://localhost:5178/edit-profile")
                  }
                >
                  Edit Profile
                </Button>

                <Button
                  icon={<LockOutlined />}
                  className="pp-password-btn"
                  onClick={() =>
                    (window.location.href =
                      "http://localhost:5178/change-password")
                  }
                >
                  Change Password
                </Button>
              </Col>

              {/* RIGHT COLUMN – Profile Info */}
              <Col
                xs={24}
                md={16}
                className={`pp-stagger-item pp-stagger-right ${staggerReady ? "visible" : ""}`}
              >
                <Title level={4} className="pp-section-title">
                  Personal Information
                </Title>

                <Divider
                  style={{ margin: "8px 0 16px", borderColor: "#e8f0f9" }}
                />

                <Row gutter={[20, 4]}>
                  <Col xs={24} sm={12}>
                    <Text className="pp-info-label">First Name</Text>
                    <Text className="pp-info-value">
                      {profile.first_name || (
                        <span className="pp-info-empty">Not set</span>
                      )}
                    </Text>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Text className="pp-info-label">Last Name</Text>
                    <Text className="pp-info-value">
                      {profile.last_name || (
                        <span className="pp-info-empty">Not set</span>
                      )}
                    </Text>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Text className="pp-info-label">
                      <UserOutlined style={{ marginRight: 4 }} /> Username
                    </Text>
                    <Text className="pp-info-value">
                      {profile.username || (
                        <span className="pp-info-empty">Not set</span>
                      )}
                    </Text>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Text className="pp-info-label">
                      <MailOutlined style={{ marginRight: 4 }} /> Email
                    </Text>
                    <Text className="pp-info-value">
                      {profile.email || (
                        <span className="pp-info-empty">Not set</span>
                      )}
                    </Text>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Text className="pp-info-label">
                      <PhoneOutlined style={{ marginRight: 4 }} /> Mobile
                    </Text>
                    <Text className="pp-info-value">
                      {profile.mobile || (
                        <span className="pp-info-empty">Not set</span>
                      )}
                    </Text>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Text className="pp-info-label">
                      <CalendarOutlined style={{ marginRight: 4 }} /> Date of
                      Birth
                    </Text>
                    <Text className="pp-info-value">
                      {profile.date_of_birth || (
                        <span className="pp-info-empty">Not set</span>
                      )}
                    </Text>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Text className="pp-info-label">Gender</Text>
                    <Text className="pp-info-value">
                      {profile.gender || (
                        <span className="pp-info-empty">Not set</span>
                      )}
                    </Text>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Text className="pp-info-label">Pincode</Text>
                    <Text className="pp-info-value">
                      {profile.pincode || (
                        <span className="pp-info-empty">Not set</span>
                      )}
                    </Text>
                  </Col>

                  <Col span={24}>
                    <Text className="pp-info-label">
                      <EnvironmentOutlined style={{ marginRight: 4 }} /> Address
                    </Text>
                    <Text className="pp-info-value">
                      {profile.address || (
                        <span className="pp-info-empty">Not set</span>
                      )}
                    </Text>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Text className="pp-info-label">City</Text>
                    <Text className="pp-info-value">
                      {profile.city || (
                        <span className="pp-info-empty">Not set</span>
                      )}
                    </Text>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Text className="pp-info-label">State</Text>
                    <Text className="pp-info-value">
                      {profile.state || (
                        <span className="pp-info-empty">Not set</span>
                      )}
                    </Text>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Text className="pp-info-label">Country</Text>
                    <Text className="pp-info-value">
                      {profile.country || (
                        <span className="pp-info-empty">Not set</span>
                      )}
                    </Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Profile;
