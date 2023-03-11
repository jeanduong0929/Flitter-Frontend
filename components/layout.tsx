import AuthProvider from "@/contexts/auth-provider";
import { ToastContainer } from "react-toastify";
import tw from "tailwind-styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";

const Main = tw.main`
  font-mono
`;

type Props = {
  children: ReactNode;
};

/**
 * A layout component that provides authentication and a main container for the application.
 *
 * @param children The child components to render within the layout.
 */
const Layout = ({ children }: Props) => {
  return (
    <AuthProvider>
      <Main>{children}</Main>
      <ToastContainer />
    </AuthProvider>
  );
};

export default Layout;
