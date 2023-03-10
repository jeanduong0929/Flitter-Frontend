import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import FLTTR from "@/utils/axios-config";
import { AuthContext } from "@/contexts/auth-provider";

const Backdrop = tw.div`
  fixed bg-black opacity-50 inset-0 w-full h-full z-10
`;

const Form = tw.form`
  fixed flex flex-col gap-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-10 shadow-xl rounded-md
`;

const Input = tw.input`
  px-5 py-2 shadow-xl rounded-md ease-out duration-300 transition focus:scale-110 bg-blue-200
`;

const Button = tw.button`
  px-5 py-2 shadow-xl rounded-md font-bold ease-out duration-300 transition hover:scale-110
`;

const Username = tw(Input)``;

const Password = tw(Input)``;

const LoginButton = tw(Button)`
  bg-teal-400
`;

interface LoginModalProps {
  setLoginModal: (value: boolean) => void;
}

type LoginPayload = {
  username: string;
  password: string;
};

const LoginModal = ({ setLoginModal }: LoginModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(AuthContext);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setLoginModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setLoginModal]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const payload: LoginPayload = {
      username: username,
      password: password,
    };

    try {
      const resp = await FLTTR.post("/auth/login", payload);
      window.sessionStorage.setItem("auth", JSON.stringify(resp.data));
      setAuth(resp.data);
      setLoginModal(false);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Backdrop />
      <Form ref={formRef} onSubmit={handleLogin}>
        <h1 className="text-4xl font-bold">LOGIN</h1>
        <Username
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Password
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton>Login</LoginButton>
      </Form>
    </div>
  );
};

export default LoginModal;
