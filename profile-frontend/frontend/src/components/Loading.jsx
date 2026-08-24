import { Spin, Typography } from "antd";

const { Text } = Typography;

// ============================================================
// STYLES – matching the app‑wide glass‑morphism UI
// ============================================================
const LOADING_STYLES = `
  @keyframes loading-rise-in {
    from { opacity: 0; transform: translateY(22px) scale(.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .loading-container {
    display: grid;
    min-height: calc(100vh - 76px);
    place-items: center;
    padding: 32px;
    background:
      radial-gradient(circle at 4% 7%, rgba(216, 240, 255, .9) 0, transparent 27rem),
      #f8faff;
  }

  .loading-card {
    width: min(440px, 100%);
    padding: 36px;
    border: 1px solid rgba(220, 231, 246, .92);
    border-radius: 26px;
    background: rgba(255, 255, 255, .84);
    box-shadow: 0 20px 44px rgba(28, 75, 130, .1);
    text-align: center;
    animation: loading-rise-in 600ms cubic-bezier(.22, 1, .36, 1) forwards;
    opacity: 0;
  }

  .loading-card .ant-spin {
    display: block;
  }

  .loading-card .ant-spin-dot {
    font-size: 32px;
  }

  .loading-tip {
    display: block;
    margin-top: 16px;
    color: #667085;
    font-size: 15px;
  }

  @media (max-width: 640px) {
    .loading-container {
      padding: 16px;
    }
    .loading-card {
      padding: 28px 20px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .loading-card {
      animation: none !important;
      opacity: 1 !important;
    }
  }
`;

function Loading({ tip = "Loading...", fullPage = true, height = "70vh" }) {
  // If not fullPage, use a simpler inline spinner (e.g., for inline loading)
  if (!fullPage) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: height || "70vh",
        }}
      >
        <Spin size="large" tip={tip} />
      </div>
    );
  }

  return (
    <>
      <style>{LOADING_STYLES}</style>
      <div className="loading-container">
        <div className="loading-card">
          <Spin size="large" />
          <Text className="loading-tip">{tip}</Text>
        </div>
      </div>
    </>
  );
}

export default Loading;