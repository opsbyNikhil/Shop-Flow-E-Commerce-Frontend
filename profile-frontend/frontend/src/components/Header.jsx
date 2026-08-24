import { Layout, Typography, Space, Button, message } from "antd";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  HomeOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

// ============================================================
// STYLES – dark glass‑morphism UI pattern (same as other headers)
// ============================================================
const HEADER_STYLES = `
  @keyframes sf-header-in {
    from { opacity: 0; transform: translateY(-14px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes sf-logo-float {
    0%, 100% { translate: 0 1px; rotate: 0deg; }
    50% { translate: 0 -3px; rotate: -4deg; }
  }

  .sf-header {
    position: sticky;
    top: 0;
    z-index: 100;
    height: 76px;
    padding: 0 !important;
    line-height: normal;
    background: rgba(10, 29, 60, .88) !important;
    border-bottom: 1px solid rgba(255, 255, 255, .12);
    box-shadow: 0 12px 30px rgba(7, 24, 50, .16);
    backdrop-filter: blur(18px);
    animation: sf-header-in 500ms cubic-bezier(.22, 1, .36, 1) both;
  }

  .sf-header::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 16% 0%, rgba(76, 175, 255, .2), transparent 25rem),
      radial-gradient(circle at 90% 100%, rgba(163, 100, 255, .16), transparent 22rem);
  }

  .sf-header-inner {
    position: relative;
    z-index: 1;
    display: flex;
    width: min(1200px, calc(100% - 48px));
    height: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin: 0 auto;
  }

  .sf-brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
  }

  .sf-brand-mark {
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, .3);
    border-radius: 13px;
    background: linear-gradient(135deg, #55b5ff, #1677ff 62%, #0958d9);
    box-shadow: 0 10px 24px rgba(22, 119, 255, .32), inset 0 1px 0 rgba(255, 255, 255, .35);
    color: #fff;
    font-size: 17px;
    font-weight: 800;
    animation: sf-logo-float 4.5s ease-in-out infinite;
    transition: transform 180ms ease, box-shadow 180ms ease;
  }

  .sf-brand:hover .sf-brand-mark {
    transform: scale(1.08) rotate(-5deg);
    box-shadow: 0 14px 28px rgba(22, 119, 255, .44), inset 0 1px 0 rgba(255, 255, 255, .35);
  }

  .sf-brand-name {
    color: #fff !important;
    font-size: 21px;
    font-weight: 800;
    letter-spacing: -.045em;
  }

  .sf-brand-name span {
    color: #9ed2ff;
  }

  .sf-navigation {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .sf-nav-button.ant-btn {
    display: inline-flex;
    height: 42px;
    align-items: center;
    gap: 7px;
    padding: 0 12px;
    border: 1px solid transparent;
    border-radius: 13px;
    color: rgba(255, 255, 255, .86);
    font-weight: 600;
    transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
  }

  .sf-nav-button.ant-btn:hover {
    border-color: rgba(255, 255, 255, .14);
    background: rgba(255, 255, 255, .11) !important;
    color: #fff !important;
    transform: translateY(-2px);
  }

  .sf-nav-button .anticon {
    font-size: 17px;
  }

  .sf-profile-button.ant-btn {
    display: inline-flex;
    height: 42px;
    align-items: center;
    gap: 7px;
    margin-left: 5px;
    padding: 0 15px;
    border: 1px solid rgba(255, 255, 255, .24);
    border-radius: 13px;
    background: linear-gradient(135deg, #55b5ff, #1677ff 58%, #0958d9);
    box-shadow: 0 10px 20px rgba(22, 119, 255, .28);
    font-weight: 700;
    color: #fff !important;
    transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
  }

  .sf-profile-button.ant-btn:hover {
    background: linear-gradient(135deg, #69c0ff, #1677ff 58%, #0958d9) !important;
    box-shadow: 0 14px 28px rgba(22, 119, 255, .42);
    filter: saturate(1.12);
    transform: translateY(-2px);
  }

  .sf-logout-button.ant-btn {
    display: inline-flex;
    height: 42px;
    align-items: center;
    gap: 7px;
    margin-left: 5px;
    padding: 0 12px;
    border: 1px solid rgba(255, 169, 169, .25);
    border-radius: 13px;
    background: rgba(255, 107, 107, .1);
    color: #ffb3b3;
    font-weight: 650;
    transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
  }

  .sf-logout-button.ant-btn:hover {
    border-color: rgba(255, 169, 169, .5);
    background: rgba(255, 107, 107, .2) !important;
    color: #fff !important;
    transform: translateY(-2px);
  }

  @media (max-width: 820px) {
    .sf-nav-label {
      display: none;
    }

    .sf-nav-button.ant-btn,
    .sf-profile-button.ant-btn,
    .sf-logout-button.ant-btn {
      width: 42px;
      justify-content: center;
      padding: 0;
    }

    .sf-profile-button.ant-btn,
    .sf-logout-button.ant-btn {
      margin-left: 2px;
    }
  }

  @media (max-width: 540px) {
    .sf-header {
      height: 68px;
    }

    .sf-header-inner {
      width: min(100% - 28px, 1200px);
      gap: 8px;
    }

    .sf-brand-name {
      display: none !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sf-header,
    .sf-brand-mark {
      animation: none !important;
    }

    .sf-brand:hover .sf-brand-mark,
    .sf-nav-button.ant-btn:hover,
    .sf-profile-button.ant-btn:hover,
    .sf-logout-button.ant-btn:hover {
      transform: none !important;
    }
  }
`;

// ============================================================
// COMPONENT
// ============================================================
function Header() {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    message.success("Logged out successfully");
    setTimeout(() => {
      window.location.href = "http://localhost:5173/login";
    }, 500);
  };

  return (
    <>
      <style>{HEADER_STYLES}</style>
      <AntHeader className="sf-header">
        <div className="sf-header-inner">
          {/* LOGO */}
          <Space
            className="sf-brand"
            align="center"
            size={0}
            onClick={() => {
              window.location.href = `${import.meta.env.VITE_HOME_FRONTEND_URL}/home`;
            }}
          >
            <span className="sf-brand-mark">S</span>
            <Text className="sf-brand-name">
              Shop<span>Flow</span>
            </Text>
          </Space>

          {/* NAVIGATION */}
          <Space className="sf-navigation" align="center" size={0}>
            <Button
              type="text"
              className="sf-nav-button"
              icon={<HomeOutlined />}
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_HOME_FRONTEND_URL}/home`;
              }}
            >
              <span className="sf-nav-label">Home</span>
            </Button>

            <Button
              type="text"
              className="sf-nav-button"
              icon={<ShoppingOutlined />}
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_PRODUCT_FRONTEND_URL}/products`;
              }}
            >
              <span className="sf-nav-label">Products</span>
            </Button>

            <Button
              type="text"
              className="sf-nav-button"
              icon={<HeartOutlined />}
              onClick={() =>
                (window.location.href = "http://localhost:5174/wishlist")
              }
            >
              <span className="sf-nav-label">Wishlist</span>
            </Button>

            <Button
              type="text"
              className="sf-nav-button"
              icon={<ShoppingCartOutlined />}
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_CART_FRONTEND_URL}/cart`;
              }}
            >
              <span className="sf-nav-label">Cart</span>
            </Button>

            <Button
              type="text"
              className="sf-nav-button"
              icon={<OrderedListOutlined />}
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_ORDER_FRONTEND_URL}/order`;
              }}
            >
              <span className="sf-nav-label">Orders</span>
            </Button>

            <Button
              type="primary"
              className="sf-profile-button"
              icon={<UserOutlined />}
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_PROFILE_FRONTEND_URL}/profile`;
              }}
            >
              <span className="sf-nav-label">Profile</span>
            </Button>

            <Button
              type="text"
              className="sf-logout-button"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              <span className="sf-nav-label">Logout</span>
            </Button>
          </Space>
        </div>
      </AntHeader>
    </>
  );
}

export default Header;
