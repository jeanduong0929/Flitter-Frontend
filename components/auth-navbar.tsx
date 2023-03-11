import React, { useState } from "react";
import tw from "tailwind-styled-components";
import LoginModal from "./login-modal";

const Nav = tw.nav`
  flex justify-between items-center px-20 py-10
`;

const LeftList = tw.ul``;

const RightList = tw.ul`
  flex items-center gap-10
`;

const Button = tw.button`
  px-5 py-2 shadow-xl rounded-md font-bold ease-out duration-300 transition hover:scale-110
`;

const LoginButton = tw(Button)`
  bg-blue-500
`;

/**
 * A component that renders the authentication navigation bar.
 */
const AuthNavbar = () => {
  const [loginModal, setLoginModal] = useState(false);

  return (
    <div>
      <Nav>
        <LeftList>
          <h1 className="text-white font-bold text-4xl">FLITTR</h1>
        </LeftList>
        <RightList>
          <LoginButton onClick={() => setLoginModal(!loginModal)}>
            Login
          </LoginButton>
        </RightList>
      </Nav>
      {loginModal && <LoginModal setLoginModal={setLoginModal} />}
    </div>
  );
};

export default AuthNavbar;
