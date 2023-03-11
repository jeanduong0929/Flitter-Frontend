import AuthNavbar from "@/components/auth-navbar";
import { AuthContext } from "@/contexts/auth-provider";
import FLTTR from "@/utils/axios-config";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import tw from "tailwind-styled-components";

const BackgroundImage = tw.div`
  bg-cover bg-no-repeat h-screen
  bg-center
  absolute top-0 left-0 w-full
  backgroundImageUrl
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

const BORDER_WHITE = "border-4 border-white";
const BORDER_RED = "border-4 border-red-500";
const BORDER_GREEN = "border-4 border-green-500";

/**
 * Payload for registering a user
 */
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
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  /**
   * Redirect to dashboard if user is already authenticated
   */
  if (auth) {
    router.push("/dashboard");
  }

  /**
   * Get all usernames on component mount
   */
  useEffect(() => {
    getAllUsernames();
  }, []);

  /**
   * Register a user
   *
   * @param e - Form submit event
   */
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

  /**
   * Get all usernames
   */
  const getAllUsernames = async (): Promise<void> => {
    try {
      const resp = await FLTTR.get("/users/usernames");
      setUsernames(resp.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  /**
   * Handle change event for username input
   *
   * @param e - Change event object
   */
  const handleUsername = (e: ChangeEvent<HTMLInputElement>): void => {
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

  /**
   * Handle change event for password input
   *
   * @param e - Change event object
   */
  const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);

    // Validate password
    if (e.target.value.length === 0) {
      setValidPassword(false);
    } else if (!isValidPassword(e.target.value)) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }

    // Validate confirm password
    if (!isSamePassword(e.target.value, confirmPassword)) {
      setValidConfirmPassword(false);
    } else if (confirmPassword.length === 0) {
      setValidConfirmPassword(false);
    } else {
      setValidConfirmPassword(true);
    }
  };

  /**
   * Handle change event for confirm password input
   *
   * @param e - Change event object
   */
  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);

    // Validate confirm password
    if (e.target.value.length === 0) {
      setValidConfirmPassword(false);
    } else if (!isSamePassword(password, e.target.value)) {
      setValidConfirmPassword(false);
    } else {
      setValidConfirmPassword(true);
    }
  };

  /**
   * Perform binary search for a target string in a sorted array of strings
   *
   * @param usernames - Sorted array of strings to search
   * @param target - Target string to search for
   * @param start - Start index for the search
   * @param end - End index for the search
   * @returns - True if the target string is found, false otherwise
   */
  const binarySearch = (
    usernames: string[] | undefined,
    target: string,
    start: number,
    end: number
  ): boolean => {
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const midValue = usernames?.[mid];
      if (midValue === target) {
        return true;
      } else if (midValue && midValue > target) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return false;
  };

  /**
   * Check if a username is valid
   *
   * @param username - Username to check
   * @returns - True if the username is valid, false otherwise
   */
  const isValidUsername = (username: string): boolean => {
    const regex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    return regex.test(username);
  };

  /**
   * Check if a password is valid
   *
   * @param password - Password to check
   * @returns - True if the password is valid, false otherwise
   */
  const isValidPassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  /**
   * Check if two passwords are the same
   *
   * @param password - First password to compare
   * @param confirmPassword - Second password to compare
   * @returns - True if the passwords are the same, false otherwise
   */
  const isSamePassword = (
    password: string,
    confirmPassword: string
  ): boolean => {
    return password === confirmPassword;
  };

  /**
   * Clear all input fields
   */
  const clearInputs = (): void => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  /**
   * Display a success message using toast notification
   *
   * @param msg - Message to display
   */
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

  /**
   * Display an error message using toast notification
   *
   * @param msg - Message to display
   */
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

  /**
   * If usernames is null, display loading message
   */
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
                ? BORDER_GREEN
                : username.trim() === ""
                ? BORDER_WHITE
                : BORDER_RED
            }`}
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsername}
          />
          <Password
            className={`${
              validPassword
                ? BORDER_GREEN
                : password.trim() === ""
                ? BORDER_WHITE
                : BORDER_RED
            }`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          <Password
            className={`${
              validConfirmPassword
                ? BORDER_GREEN
                : confirmPassword.trim() === ""
                ? BORDER_WHITE
                : BORDER_RED
            }`}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
          <RegisterButton>Register</RegisterButton>
        </RegisterForm>
      </Wrapper>
    </BackgroundImage>
  );
};

export default HomePage;
