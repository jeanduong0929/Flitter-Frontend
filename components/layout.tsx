import AuthProvider from "@/contexts/auth-provider";
import { ReactNode } from "react";
import tw from "tailwind-styled-components";

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
    </AuthProvider>
  );
};

export default Layout;
