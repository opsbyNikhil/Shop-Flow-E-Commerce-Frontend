import { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.location.href = "http://localhost:5178/profile";
  }, []);

  return null;
}

export default Home;
