import { motion } from "framer-motion";
import { Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../constants/images";
import { CustomButton } from "../ReuseComponents/CustomButton";
import { Input } from "./style";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserFormInput } from "../../constants/types";
import { useAuthStore } from "../../store/store";
import { authenticate } from "../../constants/helper";
import { Toaster, toast } from "react-hot-toast";

export const Username = () => {
  const setUsername = useAuthStore((state) => state.setUsername);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInput>();

  const formSubmitHandle: SubmitHandler<UserFormInput> = async (
    data: UserFormInput
  ) => {
    const { username } = data;

    // check if username value is not empty
    if (username) {
      // check if username exist in a database
      const response = await authenticate(username);

      // console.log(response);

      if ("status" in response && response.status === 200) {
        setUsername(username);
        toast.success(`The username ${username} is register.`);
        navigate("/password");
      } else {
        toast.error(
          `The username ${username} doesn't exist...!, kindly enter a correct username or register.`
        );
      }
    }
  };
  //
  return (
    <div className="max-w-[83%] mx-auto">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "text-xs font-semibold text-indigo-800",
          style: {
            // border: "1px solid #713200",
            // color: "#713200",
          },
          // icon: "👏",
        }}
      />
      <div className="flex justify-center items-center h-screen">
        <Stack
          className="flex flex-col gap-4 sm:gap-6 max-w-xs sm:max-w-sm bg-purple-50 bg-opacity-95 border-8 border-white rounded-xl px-4 py-6"
          style={{
            boxShadow: "0 10px 30px #4747470b",
          }}
        >
          <div className="flex flex-col gap-1 mt-6 items-center text-center">
            <h1 className="text-xl font-bold xs:text-2xl sm:text-2xl">
              Welcome To{" "}
              <span className="text-indigo-800">Drisy Authentication</span>
            </h1>
            <Typography
              fontSize={{ xs: 13, sm: 15 }}
              fontWeight={600}
              className="w-2/3 text-gray-400"
            >
              Explore more by connecting with us
            </Typography>
          </div>
          <motion.img
            src={images.profileImg}
            alt="avater"
            className="w-20 h-20 mx-auto rounded-full border-4 border-gray-100 shadow-lg hover:border-gray-200 transition duration-500 cursor-pointer"
          />
          <form
            onSubmit={handleSubmit(formSubmitHandle)}
            className="flex flex-col gap-4 sm:gap-6 justify-center items-center mt-2"
          >
            <div className="flex flex-col gap-1 justify-start w-full">
            <Input
              className="w-full bg-white shadow focus:outline-none"
              type="text"
              id="username"
              placeholder="Email or Username"
              style={{}}
              {...register("username", {
                required: true,
              })}
            />
            {errors.username && (
              // <Error errors={errors} />
              <Typography color="red" fontSize={12}>
                <>
                  *
                  {errors.username.type === "required" &&
                    "Enter your Username."}
                </>
              </Typography>
            )}
            </div>
            <CustomButton title={"Let's go"} style={{}} />
            <Typography
              fontSize={12.5}
              fontWeight={500}
              className="text-gray-500"
            >
              Not a member?{" "}
              <Link
                to="/register"
                className="ml-1 text-blue-600 font-medium xs:font-semibold text-sm"
              >
                Register now
              </Link>
            </Typography>
          </form>
        </Stack>
      </div>
    </div>
  );
};

// const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const fileList = e.target.files;
//   if (fileList && fileList.length > 0) {
//     const dataTransfer = new DataTransfer();
//     Array.from(fileList).forEach((file) => {
//       dataTransfer.items.add(file);
//     });
//     const fileArray = dataTransfer.files;
//     setValue("profileImg", fileArray);
//     setFileError(false);
//   }
// };

// const onUploadUserImage = async (
//   event: React.ChangeEvent<HTMLInputElement>
// ) => {
//   const base64 = await convertTOBase64(file);
//   setUserImage(base64);
// };
// const onUploadUserImage = (event: React.ChangeEvent<HTMLInputElement>) => {
//   return new Promise((resolve, rejects) => {
//     const fileReader = new FileReader();

//     fileReader.readAsDataURL(event.target.files?.[0]!);

//     fileReader.onload = () => {
//       resolve(setUserImage(fileReader.result as string));
//       // setUserImage(base64Data ?? "");)
//     };
//     fileReader.onerror = (error) => {
//       rejects(error);
//     };
//   });
// };
