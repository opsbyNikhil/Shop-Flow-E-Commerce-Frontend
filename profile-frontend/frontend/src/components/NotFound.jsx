import { Empty, Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <style>{`
        .notfound-page {
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

        .notfound-card {
          width: min(480px, 100%);
          padding: 48px 36px;
          border: 1px solid rgba(220, 231, 246, .92);
          border-radius: 26px;
          background: rgba(255, 255, 255, .84);
          box-shadow: 0 20px 44px rgba(28, 75, 130, .1);
          text-align: center;
        }

        .notfound-card .ant-empty {
          margin-bottom: 24px;
        }

        .notfound-back-btn.ant-btn {
          height: 46px;
          padding-inline: 24px;
          border: none;
          border-radius: 13px;
          background: linear-gradient(135deg, #55b5ff, #1677ff 60%, #0958d9);
          box-shadow: 0 12px 22px rgba(22, 119, 255, .24);
          font-weight: 700;
          color: #fff !important;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .notfound-back-btn.ant-btn:hover {
          box-shadow: 0 16px 28px rgba(22, 119, 255, .34);
          transform: translateY(-2px);
        }

        .notfound-back-btn.ant-btn .anticon {
          margin-right: 8px;
        }

        @media (prefers-reduced-motion: reduce) {
          .notfound-back-btn.ant-btn:hover {
            transform: none !important;
          }
        }
      `}</style>

      <div className="notfound-card">
        <Empty description="No Data Found" />
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          className="notfound-back-btn"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
