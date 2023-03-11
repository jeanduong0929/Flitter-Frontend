import { AuthContext } from "@/contexts/auth-provider";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import FollowingIcon from "./icons/following-icon";
import GearIcon from "./icons/gear-icon";
import HeartIcon from "./icons/heart-icon";
import LogoutIcon from "./icons/logout-icon";
import UserIcon from "./icons/user-icon";

const DropdownWrapper = tw.div`
  relative
`;

const User = tw(UserIcon)`
  w-7 h-7 cursor-pointer
`;

const Dropdown = tw.div`
  absolute right-0 top-5 bg-gray-600 shadow-xl rounded-md p-5
`;

const ListWrapper = tw.div`
  flex items-center gap-2 cursor-pointer ease-out duration-300 transition hover:scale-110
`;

const UnorderedList = tw.li`
  flex flex-col gap-5
`;

const Li = tw.li``;

interface UserDropdownProps {
  userDropdown: boolean;
  setUserDropdown: (value: boolean) => void;
}

const UserDropdown = ({ userDropdown, setUserDropdown }: UserDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setUserDropdown(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setUserDropdown]);

  const handleGoToProfile = () => {
    setUserDropdown(false);
    router.push("/profile");
  };

  const handleLogout = () => {
    setAuth(null);
    setUserDropdown(false);
    window.sessionStorage.removeItem("auth");
    router.push("/");
  };

  return (
    <DropdownWrapper
      ref={dropdownRef}
      onClick={() => setUserDropdown(!userDropdown)}
    >
      <User />
      <Transition
        show={userDropdown}
        enter="transition ease-out duration-300"
        enterFrom="transform opacity-0 scale-90"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Dropdown>
          <UnorderedList>
            <ListWrapper>
              <HeartIcon className={"w-6 h-6 text-red-500"} />
              <Li>Likes</Li>
            </ListWrapper>

            <ListWrapper>
              <FollowingIcon className={"w-6 h-6"} />
              <Li>Following</Li>
            </ListWrapper>

            <ListWrapper onClick={handleGoToProfile}>
              <GearIcon className={"w-6 h-6"} />
              <Li>Settings</Li>
            </ListWrapper>

            <ListWrapper onClick={handleLogout}>
              <LogoutIcon className={"w-6 h-6"} />
              <Li>Log out</Li>
            </ListWrapper>
          </UnorderedList>
        </Dropdown>
      </Transition>
    </DropdownWrapper>
  );
};

export default UserDropdown;
