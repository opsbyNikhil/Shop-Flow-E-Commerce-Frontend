import { Card, Row, Col, Button, Typography } from "antd";
import { EditOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";

const { Title, Text } = Typography;

// ============================================================
// STYLES – glass‑morphism card matching the app‑wide UI
// ============================================================
const PROFILE_CARD_STYLES = `
  .profile-card {
    overflow: hidden;
    border: 1px solid rgba(220, 231, 246, .92) !important;
    border-radius: 22px !important;
    background: rgba(255, 255, 255, .9) !important;
    box-shadow: 0 16px 36px rgba(28, 75, 130, .08) !important;
    transition: box-shadow 200ms ease;
  }

  .profile-card:hover {
    box-shadow: 0 20px 44px rgba(28, 75, 130, .12) !important;
  }

  .profile-card .ant-card-body {
    padding: 28px 32px;
  }

  .profile-edit-btn.ant-btn,
  .profile-password-btn.ant-btn {
    height: 44px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 14px;
    transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
    width: 100%;
    margin-top: 8px;
  }

  .profile-edit-btn.ant-btn {
    border: none;
    background: linear-gradient(135deg, #55b5ff, #1677ff 60%, #0958d9);
    box-shadow: 0 10px 20px rgba(22, 119, 255, .24);
    color: #fff !important;
  }

  .profile-edit-btn.ant-btn:hover {
    box-shadow: 0 14px 28px rgba(22, 119, 255, .34);
    transform: translateY(-2px);
  }

  .profile-password-btn.ant-btn {
    border: 1px solid #dce7f6;
    background: rgba(255, 255, 255, .7);
    color: #4a5a72;
  }

  .profile-password-btn.ant-btn:hover {
    border-color: #1677ff;
    background: #e6f4ff !important;
    color: #0958d9 !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(22, 119, 255, .12);
  }

  .profile-name {
    margin: 16px 0 4px !important;
    color: #15213a !important;
    font-size: 22px !important;
    font-weight: 800 !important;
    letter-spacing: -.03em;
  }

  .profile-username {
    display: block;
    color: #667085 !important;
    font-size: 14px;
  }

  .profile-avatar-wrapper {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .profile-card .ant-card-body {
      padding: 20px;
    }

    .profile-name {
      font-size: 20px !important;
    }
  }

  @media (max-width: 576px) {
    .profile-card .ant-card-body {
      padding: 16px;
    }

    .profile-edit-btn.ant-btn,
    .profile-password-btn.ant-btn {
      height: 40px;
      font-size: 13px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .profile-edit-btn.ant-btn:hover,
    .profile-password-btn.ant-btn:hover {
      transform: none !important;
    }
  }
`;

function ProfileCard({ profile }) {
  const navigate = useNavigate();

  return (
    <>
      <style>{PROFILE_CARD_STYLES}</style>
      <Card className="profile-card">
        <Row gutter={[40, 30]} align="top">
          {/* LEFT COLUMN – Avatar & Actions */}
          <Col xs={24} md={8} style={{ textAlign: "center" }}>
            <div className="profile-avatar-wrapper">
              <ProfileImage image={profile.profile_image} />
            </div>

            <Title level={3} className="profile-name">
              {profile.first_name} {profile.last_name}
            </Title>

            <Text className="profile-username">@{profile.username}</Text>

            <div style={{ marginTop: 20 }}>
              <Button
                type="primary"
                icon={<EditOutlined />}
                className="profile-edit-btn"
                onClick={() =>
                  (window.location.href = "http://localhost:5178/edit-profile")
                }
              >
                Edit Profile
              </Button>

              <Button
                icon={<LockOutlined />}
                className="profile-password-btn"
                onClick={() =>
                  (window.location.href = "http://localhost:5178/change-password")
                }
              >
                Change Password
              </Button>
            </div>
          </Col>

          {/* RIGHT COLUMN – Profile Info */}
          <Col xs={24} md={16}>
            <ProfileInfo profile={profile} />
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default ProfileCard;