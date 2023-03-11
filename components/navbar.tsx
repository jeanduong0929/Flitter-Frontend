import { useState } from "react";
import tw from "tailwind-styled-components";
import HomeIcon from "./icons/home-icon";
import UserDropdown from "./user-dropdown";

const Nav = tw.nav`
  flex justify-between items-center px-20 py-10 shadow-xl bg-gray-800
`;

const LeftList = tw.ul``;

const RightList = tw.ul`
  flex items-center gap-10
`;

const Navbar = () => {
  const [userDropdown, setUserDropdown] = useState(false);

  return (
    <Nav>
      <LeftList>
        <h1 className="text-4xl font-bold">FLITTR</h1>
      </LeftList>

      <RightList>
        <HomeIcon className={"w-6 h-6 cursor-pointer"} />
        <UserDropdown
          userDropdown={userDropdown}
          setUserDropdown={setUserDropdown}
        />
      </RightList>
    </Nav>
  );
};

export default Navbar;
