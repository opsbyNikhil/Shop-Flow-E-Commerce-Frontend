import { Result, Button, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const { Text } = Typography;

function PageNotFound() {
  return (
    <div className="notfound-page">
      <style>{`
        @keyframes nf-rise-in {
          from { opacity: 0; transform: translateY(22px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes nf-orb-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-23px, 25px, 0) scale(1.1); }
        }

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
          position: relative;
          width: min(520px, 100%);
          padding: 48px 36px;
          border: 1px solid rgba(255, 255, 255, .88);
          border-radius: 30px;
          background: rgba(255, 255, 255, .84);
          box-shadow: 0 22px 48px rgba(28, 75, 130, .1);
          backdrop-filter: blur(14px);
          animation: nf-rise-in 650ms cubic-bezier(.22, 1, .36, 1) both;
          text-align: center;
        }

        .notfound-card::before,
        .notfound-card::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: nf-orb-drift 8s ease-in-out infinite;
        }

        .notfound-card::before {
          width: 160px;
          height: 160px;
          top: -80px;
          right: -60px;
          background: rgba(22, 119, 255, .10);
        }

        .notfound-card::after {
          width: 120px;
          height: 120px;
          bottom: -60px;
          left: -60px;
          background: rgba(255, 133, 192, .12);
          animation-delay: -4s;
        }

        .notfound-card .ant-result {
          position: relative;
          z-index: 1;
        }

        .notfound-card .ant-result-title {
          color: #15213a !important;
          font-weight: 800 !important;
        }

        .notfound-card .ant-result-subtitle {
          color: #667085 !important;
          font-size: 15px !important;
        }

        .notfound-btn.ant-btn {
          height: 46px;
          padding-inline: 28px;
          border: none;
          border-radius: 13px;
          background: linear-gradient(135deg, #55b5ff, #1677ff 60%, #0958d9);
          box-shadow: 0 12px 22px rgba(22, 119, 255, .24);
          font-weight: 700;
          color: #fff !important;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .notfound-btn.ant-btn:hover {
          box-shadow: 0 16px 28px rgba(22, 119, 255, .34);
          transform: translateY(-2px);
        }

        .notfound-btn .anticon {
          margin-right: 8px;
        }

        @media (max-width: 576px) {
          .notfound-card {
            padding: 32px 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .notfound-card,
          .notfound-card::before,
          .notfound-card::after {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }

          .notfound-btn.ant-btn:hover {
            transform: none !important;
          }
        }
      `}</style>

      <div className="notfound-card">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button
              type="primary"
              icon={<HomeOutlined />}
              className="notfound-btn"
              onClick={() =>
                (window.location.href = "http://localhost:5178/profile")
              }
            >
              Go to Profile
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default PageNotFound;
