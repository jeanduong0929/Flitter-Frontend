import AuthProvider from "@/contexts/auth-provider";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import tw from "tailwind-styled-components";
import "react-toastify/dist/ReactToastify.css";

const Main = tw.main`
  font-mono
`;

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <AuthProvider>
      <Main>{children}</Main>
      <ToastContainer />
    </AuthProvider>
  );
};

export default Layout;
