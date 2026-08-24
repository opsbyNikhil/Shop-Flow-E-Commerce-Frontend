import { Row, Col, Typography, Divider } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

// ============================================================
// STYLES – clean, polished info display
// ============================================================
const PROFILE_INFO_STYLES = `
  .profile-info-section {
    padding: 4px 0;
  }

  .profile-info-section .ant-divider {
    margin: 16px 0 20px;
    border-color: #e8f0f9;
  }

  .profile-info-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .06em;
    color: #8c9ab0;
    margin-bottom: 3px;
  }

  .profile-info-value {
    display: block;
    font-size: 15px;
    font-weight: 500;
    color: #15213a;
    padding: 6px 0 10px;
    border-bottom: 1px solid #f0f4fa;
  }

  .profile-info-value:last-of-type {
    border-bottom: none;
  }

  .profile-info-value-with-icon {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .profile-info-value-with-icon .anticon {
    color: #1677ff;
    font-size: 16px;
  }

  .profile-info-empty {
    color: #b0b8c4;
    font-style: italic;
  }

  @media (max-width: 576px) {
    .profile-info-value {
      font-size: 14px;
      padding: 4px 0 8px;
    }
  }
`;

function ProfileInfo({ profile }) {
  return (
    <>
      <style>{PROFILE_INFO_STYLES}</style>
      <div className="profile-info-section">
        <Title
          level={4}
          style={{ margin: 0, color: "#15213a", fontWeight: 700 }}
        >
          Personal Information
        </Title>

        <Divider />

        <Row gutter={[24, 4]}>
          {/* First Name */}
          <Col xs={24} sm={12}>
            <Text className="profile-info-label">First Name</Text>
            <Text className="profile-info-value">
              {profile.first_name || (
                <span className="profile-info-empty">Not set</span>
              )}
            </Text>
          </Col>

          {/* Last Name */}
          <Col xs={24} sm={12}>
            <Text className="profile-info-label">Last Name</Text>
            <Text className="profile-info-value">
              {profile.last_name || (
                <span className="profile-info-empty">Not set</span>
              )}
            </Text>
          </Col>

          {/* Username */}
          <Col xs={24} sm={12}>
            <Text className="profile-info-label">
              <UserOutlined style={{ marginRight: 4 }} /> Username
            </Text>
            <Text className="profile-info-value">
              {profile.username || (
                <span className="profile-info-empty">Not set</span>
              )}
            </Text>
          </Col>

          {/* Email */}
          <Col xs={24} sm={12}>
            <Text className="profile-info-label">
              <MailOutlined style={{ marginRight: 4 }} /> Email
            </Text>
            <Text className="profile-info-value">
              {profile.email || (
                <span className="profile-info-empty">Not set</span>
              )}
            </Text>
          </Col>

          {/* Mobile */}
          <Col xs={24} sm={12}>
            <Text className="profile-info-label">
              <PhoneOutlined style={{ marginRight: 4 }} /> Mobile
            </Text>
            <Text className="profile-info-value">
              {profile.mobile || (
                <span className="profile-info-empty">Not set</span>
              )}
            </Text>
          </Col>

          {/* Date of Birth */}
          <Col xs={24} sm={12}>
            <Text className="profile-info-label">
              <CalendarOutlined style={{ marginRight: 4 }} /> Date of Birth
            </Text>
            <Text className="profile-info-value">
              {profile.date_of_birth || (
                <span className="profile-info-empty">Not set</span>
              )}
            </Text>
          </Col>

          {/* Gender */}
          <Col xs={24} sm={12}>
            <Text className="profile-info-label">Gender</Text>
            <Text className="profile-info-value">
              {profile.gender || (
                <span className="profile-info-empty">Not set</span>
              )}
            </Text>
          </Col>

          {/* Pincode */}
          <Col xs={24} sm={12}>
            <Text className="profile-info-label">Pincode</Text>
            <Text className="profile-info-value">
              {profile.pincode || (
                <span className="profile-info-empty">Not set</span>
              )}
            </Text>
          </Col>

          {/* Address */}
          <Col span={24}>
            <Text className="profile-info-label">
              <EnvironmentOutlined style={{ marginRight: 4 }} /> Address
            </Text>
            <Text className="profile-info-value">
              {profile.address || (
                <span className="profile-info-empty">Not set</span>
              )}
            </Text>
          </Col>

          {/* City, State, Country */}
          <Col xs={24} sm={8}>
            <Text className="profile-info-label">City</Text>
            <Text className="profile-info-value">
              {profile.city || (
                <span className="profile-info-empty">Not set</span>
              )}
            </Text>
          </Col>

          <Col xs={24} sm={8}>
            <Text className="profile-info-label">State</Text>
            <Text className="profile-info-value">
              {profile.state || (
                <span className="profile-info-empty">Not set</span>
              )}
            </Text>
          </Col>

          <Col xs={24} sm={8}>
            <Text className="profile-info-label">Country</Text>
            <Text className="profile-info-value">
              {profile.country || (
                <span className="profile-info-empty">Not set</span>
              )}
            </Text>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProfileInfo;
