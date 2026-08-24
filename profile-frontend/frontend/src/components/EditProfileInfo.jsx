import {
  Form,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  Select,
  Upload,
  Typography,
} from "antd";
import { UploadOutlined, SaveOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

// ============================================================
// STYLES – matching the app‑wide glass‑morphism UI (for this component)
// ============================================================
const EDIT_PROFILE_STYLES = `
  .edit-profile-form .ant-input,
  .edit-profile-form .ant-input-affix-wrapper,
  .edit-profile-form .ant-select-selector,
  .edit-profile-form .ant-picker {
    border-radius: 10px !important;
    border-color: #dce7f6 !important;
    transition: border-color 200ms ease, box-shadow 200ms ease;
  }

  .edit-profile-form .ant-input:hover,
  .edit-profile-form .ant-input-affix-wrapper:hover,
  .edit-profile-form .ant-select-selector:hover,
  .edit-profile-form .ant-picker:hover {
    border-color: #1677ff !important;
  }

  .edit-profile-form .ant-input:focus,
  .edit-profile-form .ant-input-affix-wrapper:focus,
  .edit-profile-form .ant-select-selector:focus,
  .edit-profile-form .ant-picker:focus {
    border-color: #1677ff !important;
    box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.16) !important;
  }

  .edit-profile-form .ant-upload {
    border-radius: 10px !important;
  }

  .edit-profile-save-btn.ant-btn {
    height: 46px;
    border: none;
    border-radius: 13px;
    background: linear-gradient(135deg, #55b5ff, #1677ff 60%, #0958d9);
    box-shadow: 0 12px 22px rgba(22, 119, 255, 0.24);
    font-weight: 700;
    font-size: 15px;
    transition: transform 180ms ease, box-shadow 180ms ease;
    color: #fff !important;
  }

  .edit-profile-save-btn.ant-btn:hover:not(:disabled) {
    box-shadow: 0 16px 28px rgba(22, 119, 255, 0.34);
    transform: translateY(-2px);
  }

  .edit-profile-save-btn.ant-btn:disabled {
    background: #c7d1df;
    box-shadow: none;
  }

  .edit-profile-upload-btn.ant-btn {
    height: 40px;
    border-radius: 10px;
    border: 1px dashed #dce7f6;
    background: transparent;
    color: #4a5a72;
    font-weight: 600;
    transition: border-color 180ms ease, color 180ms ease, background 180ms ease;
  }

  .edit-profile-upload-btn.ant-btn:hover {
    border-color: #1677ff;
    color: #1677ff;
    background: rgba(22, 119, 255, 0.04);
  }

  .edit-profile-upload-btn .anticon {
    color: #1677ff;
  }

  @media (prefers-reduced-motion: reduce) {
    .edit-profile-save-btn.ant-btn:hover {
      transform: none !important;
    }
  }
`;

function EditProfileInfo({ form, onFinish, loading }) {
  return (
    <>
      <style>{EDIT_PROFILE_STYLES}</style>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="edit-profile-form"
        style={{ width: "100%" }}
      >
        <Row gutter={[20, 0]}>
          {/* Profile Image */}
          <Col span={24}>
            <Form.Item label="Profile Image" name="profile_image">
              <Upload listType="picture" beforeUpload={() => false}>
                <Button
                  icon={<UploadOutlined />}
                  className="edit-profile-upload-btn"
                >
                  Choose Image
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* Date of Birth */}
          <Col xs={24} sm={12}>
            <Form.Item label="Date of Birth" name="date_of_birth">
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Select date"
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>

          {/* Gender */}
          <Col xs={24} sm={12}>
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
          <Col span={24}>
            <Form.Item label="Address" name="address">
              <TextArea rows={4} placeholder="Enter your address" />
            </Form.Item>
          </Col>

          {/* City, State, Country, Pincode */}
          <Col xs={24} sm={12}>
            <Form.Item label="City" name="city">
              <Input placeholder="Enter city" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="State" name="state">
              <Input placeholder="Enter state" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Country" name="country">
              <Input placeholder="Enter country" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Pincode" name="pincode">
              <Input placeholder="Enter pincode" />
            </Form.Item>
          </Col>

          {/* Save Button */}
          <Col span={24} style={{ marginTop: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
              className="edit-profile-save-btn"
              block
            >
              Save Changes
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default EditProfileInfo;
