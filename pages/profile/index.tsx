import UserIcon from "@/components/icons/user-icon";
import Navbar from "@/components/navbar";
import tw from "tailwind-styled-components";

const Profile = tw.div`
  bg-slate-800 text-white w-full h-full font-mono
`;

const Wrapper = tw.div`
  flex flex-col items-center mt-40 bg-white p-10 rounded-md shadow-md mb-40
`;

const Form = tw.form`
  flex flex-col items-center justify-center rounded-md gap-10 text-black 
`;

const H1 = tw.h1`
  text-4xl font-bold text-black
`;

const Divider = tw.div`
  border-b-2 border-gray-300 w-full mt-8
`;

const Picture = tw.input`
  text-black
`;

const ProfilePage = () => {
  return (
    <Profile>
      <Navbar />
      <div className="flex flex-col items-center">
        <Wrapper>
          <H1>Profile</H1>
          <Form>
            <Divider />
            <h2 className="font-bold text-2xl">Change Profile Picture</h2>
            <div className="bg-slate-300 p-10">
              <UserIcon className={"w-10 h-10 text-black"} />
            </div>
            <Picture type="file" />
          </Form>
        </Wrapper>
      </div>
    </Profile>
  );
};

export default ProfilePage;
