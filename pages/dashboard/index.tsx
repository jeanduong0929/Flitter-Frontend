import Navbar from "@/components/navbar";
import { AuthContext } from "@/contexts/auth-provider";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import tw from "tailwind-styled-components";

const Dashboard = tw.div`
  bg-slate-800 text-white w-screen h-screen font-mono
`;

const DashboardPage = () => {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/");
    }
  }, [auth, router]);

  return (
    <Dashboard>
      <Navbar />
      <h1>{auth?.username}</h1>
    </Dashboard>
  );
};

export default DashboardPage;
