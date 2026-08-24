import { Avatar, Upload, Button, Typography } from "antd";
import {
  UserOutlined,
  UploadOutlined,
  CameraOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

// ============================================================
// STYLES – matching glass‑morphism UI
// ============================================================
const PROFILE_IMAGE_STYLES = `
  .profile-avatar-wrapper {
    position: relative;
    display: inline-block;
  }

  .profile-avatar {
    border: 3px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 8px 24px rgba(28, 75, 130, 0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .profile-avatar:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 32px rgba(22, 119, 255, 0.25);
  }

  .profile-avatar .ant-avatar-string {
    font-size: 42px;
    font-weight: 300;
    color: #b0c4de;
  }

  .profile-upload-btn.ant-btn {
    height: 40px;
    border: 1px dashed #dce7f6;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.7);
    color: #4a5a72;
    font-weight: 600;
    transition: border-color 180ms ease, color 180ms ease, background 180ms ease, transform 180ms ease;
  }

  .profile-upload-btn.ant-btn:hover {
    border-color: #1677ff;
    color: #1677ff;
    background: rgba(22, 119, 255, 0.06);
    transform: translateY(-2px);
  }

  .profile-upload-btn .anticon {
    color: #1677ff;
  }

  .profile-upload-hint {
    display: block;
    margin-top: 6px;
    color: #8c9ab0;
    font-size: 12px;
  }

  @media (max-width: 576px) {
    .profile-avatar {
      width: 120px !important;
      height: 120px !important;
      font-size: 48px !important;
    }

    .profile-avatar .ant-avatar-string {
      font-size: 32px;
    }

    .profile-upload-btn.ant-btn {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .profile-avatar:hover,
    .profile-upload-btn.ant-btn:hover {
      transform: none !important;
    }
  }
`;

function ProfileImage({ image, editable = false }) {
  return (
    <>
      <style>{PROFILE_IMAGE_STYLES}</style>
      <div style={{ textAlign: "center" }}>
        <div className="profile-avatar-wrapper">
          <Avatar
            size={160}
            src={image}
            icon={<UserOutlined />}
            className="profile-avatar"
          />
        </div>

        {editable && (
          <div style={{ marginTop: 20 }}>
            <Upload
              beforeUpload={() => false}
              listType="picture"
              showUploadList={false}
            >
              <Button
                icon={<CameraOutlined />}
                className="profile-upload-btn"
                block
              >
                Upload Photo
              </Button>
            </Upload>
            <Text className="profile-upload-hint">
              JPG, PNG or GIF (max 2MB)
            </Text>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileImage;
