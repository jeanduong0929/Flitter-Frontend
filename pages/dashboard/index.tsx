import { AuthContext } from "@/contexts/auth-provider";
import { useContext } from "react";

const DashboardPage = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <h1>{auth?.username}</h1>
    </div>
  );
};

export default DashboardPage;
