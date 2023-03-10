import AuthNavbar from "@/components/auth-navbar";
import { AuthContext } from "@/contexts/auth-provider";
import FLTTR from "@/utils/axios-config";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import tw from "tailwind-styled-components";

const BackgroundImage = tw.div`
  background-image: url(https://free4kwallpapers.com/uploads/originals/2022/03/23/-beautiful-sunset-with-a-rocket-wallpaper.png);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`;

const Wrapper = tw.div`
  flex flex-col items-center
`;

const RegisterForm = tw.form`
  fixed flex flex-col gap-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
`;

const Input = tw.input`
  px-5 py-2 shadow-md rounded-md ease-out transition duration-300 focus:scale-110
`;

const Button = tw.button`
  px-5 py-2 shadow-md rounded-md ease-out transition duration-300 hover:scale-110 font-bold
`;

const Username = tw(Input)``;

const Password = tw(Input)``;

const RegisterButton = tw(Button)`
  bg-teal-500
`;

type RegisterPayload = {
  username: string;
  password1: string;
  password2: string;
};

const HomePage = () => {
  const backgroundImageUrl =
    "https://free4kwallpapers.com/uploads/originals/2022/03/23/-beautiful-sunset-with-a-rocket-wallpaper.png";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const payload: RegisterPayload = {
      username: username,
      password1: password,
      password2: confirmPassword,
    };

    try {
      await FLTTR.post("/auth/register", payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BackgroundImage
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <AuthNavbar />
      <Wrapper>
        <RegisterForm onSubmit={handleRegister}>
          <h1 className="text-white text-4xl font-bold">Register</h1>
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
          <Password
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <RegisterButton>Register</RegisterButton>
        </RegisterForm>
      </Wrapper>
    </BackgroundImage>
  );
};

export default HomePage;
