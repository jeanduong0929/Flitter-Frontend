import AuthNavbar from "@/components/auth-navbar";
import FLTTR from "@/utils/axios-config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
  const [usernames, setUsernames] = useState<string[]>();
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    getAllUsernames();
  }, []);

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
      RegisterSuccess("Register Success");
      clearInputs();
    } catch (error: any) {
      RegisterFailed(error.response.data.Message);
    }
  };

  const getAllUsernames = async (): Promise<void> => {
    try {
      const resp = await FLTTR.get("/users/usernames");
      setUsernames(resp.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);

    // if username is empty, set validUsername to false
    if (e.target.value.length === 0) {
      setValidUsername(false);

      // if username is not empty, check if username is valid
    } else if (
      // usernames! is used to tell typescript that usernames is not null or undefined
      binarySearch(usernames!, e.target.value, 0, usernames!.length - 1)
    ) {
      // set validUsername to false and apply red border color
      setValidUsername(false);
    } else if (!isValidUsername(e.target.value)) {
      // set validUsername to false and apply red border color
      setValidUsername(false);
    } else {
      // set validUsername to true and apply green border color
      setValidUsername(true);
    }
  };

  const binarySearch = (
    usernames: string[],
    target: string,
    start: number,
    end: number
  ): boolean => {
    if (start > end) return false;
    const mid = Math.floor((start + end) / 2);
    if (usernames[mid] === target) return true;
    else if (usernames[mid] > target)
      return binarySearch(usernames, target, start, mid - 1);
    else return binarySearch(usernames, target, mid + 1, end);
  };

  const isValidUsername = (username): boolean => {
    const regex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    return regex.test(username);
  };

  const isValidPassword = (password): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const clearInputs = (): void => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const RegisterSuccess = (msg: string): void => {
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const RegisterFailed = (msg: string): void => {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  if (!usernames) return <div>Loading...</div>;

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
            className={`${
              validUsername
                ? "border-4 border-green-500"
                : username.trim() === ""
                ? "border-white"
                : "border-4 border-red-500"
            }`}
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsername}
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
