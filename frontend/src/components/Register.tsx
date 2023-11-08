import { InputAdornment, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "./Username/style";
import { RegFormInput } from "../constants/types";
import { CustomButton } from "./ReuseComponents/CustomButton";
import { images } from "../constants/images";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../constants/helper";
import { Toaster, toast } from "react-hot-toast";
import { Avatar } from "@files-ui/react";
export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<RegFormInput>();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // const onUploadUserImage = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   return new Promise((resolve, reject) => {
  //     const file = event.target.files?.[0];

  //     if (file) {
  //       const reader = new FileReader();

  //       reader.onload = (e) => {
  //         const base64Image = e.target?.result as string;
  //         setSelectedImage(base64Image); // Update the selected image URL
  //         setValue("profileImg", base64Image); // Update the value of profileImg field with the base64 string
  //         console.log(getValues("profileImg"));
  //         resolve(base64Image); // Resolve the promise with the base64 string
  //       };

  //       reader.onerror = (error) => {
  //         reject(error); // Reject the promise if an error occurs
  //       };

  //       reader.readAsDataURL(file);
  //     } else {
  //       reject(new Error("No file selected")); // Reject the promise if no file is selected
  //     }
  //   });
  // };

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (selectedFile: File) => {
    // Check if the file size is less than 500KB
    if (selectedFile.size > 500 * 1024) {
      toast.error(`File must be lesser than than 500KB`);
      return;
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setImageUrl(base64Image); // Set the selected image URL to the base64 image
    };

    reader.readAsDataURL(selectedFile);
  };

  const formSubmitHandle: SubmitHandler<RegFormInput> = async (
    data: RegFormInput
  ) => {
    setIsLoading(true);
    const username = getValues("username");
    const info = {
      profileImg: imageUrl,
      username: username,
      email: data.email,
      password: data.password,
    };
    const registerPromise = registerUser(info);
    
    await registerPromise
      .then((data) => {
        navigate("/");
        toast.success(`${data}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // const validateFileType = (files: any) => {
  //   const file = files[0];
  //   if (file) {
  //     const acceptedTypes = ["image/jpeg", "image/png"];
  //     return (
  //       acceptedTypes.includes(file.type) ||
  //       "Only JPG, JPEG, and PNG file types are allowed"
  //     );
  //   }
  // };

  return (
    <div className="mx-auto max-w-[87%]">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "text-xs font-semibold text-indigo-800",
          style: {},
        }}
      />
      <div className="flex justify-center items-center h-screen">
        <Stack
          className="flex flex-col gap-6 md:gap-8 w-[24rem] bg-purple-50 bg-opacity-95 border-8 border-white rounded-xl px-4 py-6"
          style={{
            boxShadow: "0 10px 30px #4747470b",
          }}
        >
          <div className="flex flex-col gap-1 items-center text-center">
            <h1 className="text-xl font-bold xs:text-2xl sm:text-3xl">
              <span className="text-indigo-800">Regis</span>ter
            </h1>
            <Typography
              fontSize={{ xs: 13, sm: 15 }}
              fontWeight={600}
              className="w-2/3 text-gray-400"
            >
              Start your journey with us
            </Typography>
          </div>
          <form
            onSubmit={handleSubmit(formSubmitHandle)}
            className="flex flex-col gap-4 sm:gap-4 justify-center items-center mt-2"
          >
            <motion.div className="flex flex-col gap-2 justify-center items-center text-center mb-6">
              <Avatar
                src={imageUrl || images.profileImg}
                alt="Avatar"
                smartImgFit={"center"}
                changeLabel={`${
                  imageUrl === null ? `Add a profile ` : `Change image`
                }`}
                onChange={handleFileChange}
                // variant="circle"
                style={{
                  width: "6.5rem",
                  height: "6.5rem",
                  borderRadius: "100%",
                  border: "6px solid white",
                }}
              />
              {/* {imgError !== null && (
                <span className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1"></span>
              )} */}
            </motion.div>
            <div className="flex flex-col w-full gap-1">
              <Input
                className="w-full focus:outline-none focus:bg-white"
                type={"text"}
                id="username"
                placeholder="Drisy"
                style={{}}
                {...register("username", {
                  required: true,
                  minLength: 2,
                })}
              />
              {errors.username && (
                <Typography className="text-start" color="red" fontSize={12}>
                  <>
                    *
                    {errors.username.type === "required" &&
                      "This field is required."}
                    {errors.username.type === "minLength" &&
                      "Username must be at least 2 characters."}
                  </>
                </Typography>
              )}
            </div>
            <div className="flex flex-col w-full gap-1">
              <Input
                className="w-full focus:outline-none"
                type={"email"}
                id="email"
                placeholder="Enter valid email"
                {...register("email", {
                  required: true,
                  minLength: 8,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
              />
              {errors.email && (
                <Typography color="red" fontSize={12} textAlign="start">
                  <>
                    *{errors.email.message}
                    {errors.email.type === "required" &&
                      "This field is required."}
                    {errors.email.type === "pattern" &&
                      "Email must contain @, complete and be valid. "}
                    {errors.email.type === "minLength" &&
                      "Password must be at least 8 characters."}
                  </>
                </Typography>
              )}
            </div>
            <div className="flex flex-col w-full gap-1">
              <div className="flex justify-center items-center w-full bg-white shadow">
                <Input
                  className="w-full focus:outline-none"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                    minLength: 8,
                  })}
                />
                <InputAdornment
                  position="end"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ cursor: "pointer", paddingRight: "1rem" }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </InputAdornment>
              </div>
              {errors.password && (
                <Typography color="red" fontSize={12} textAlign="start">
                  <>
                    *
                    {errors.password.type === "required" &&
                      "This field is required."}
                    {errors.password.type === "pattern" &&
                      "Password must contain at least one upper case and one special character"}
                    {errors.password.type === "minLength" &&
                      "Password must be at least 8 characters."}
                  </>
                </Typography>
              )}
            </div>
            <div className="flex flex-col w-full gap-1">
              <div className="flex justify-center items-center w-full bg-white shadow">
                <Input
                  className="w-full focus:outline-none"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Repeat Password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === watch("password"),
                  })}
                />
                <InputAdornment
                  position="end"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  sx={{ cursor: "pointer", paddingRight: "1rem" }}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </InputAdornment>
              </div>
              {errors.confirmPassword && (
                <Typography color="red" fontSize={12} textAlign="start">
                  <>
                    *
                    {errors.confirmPassword.type === "required" &&
                      "This field is required."}
                    {errors.confirmPassword.type === "validate" &&
                      "The password does not match."}
                  </>
                </Typography>
              )}
            </div>
            <CustomButton isLoading={isLoading} title={"Sign in"} style={{}} />
            <Typography
              fontSize={12.5}
              fontWeight={500}
              className="text-gray-500"
            >
              Already register{" "}
              <Link
                to="/"
                className="ml-1 text-blue-600 font-medium xs:font-semibold text-sm"
              >
                Login now
              </Link>
            </Typography>
          </form>
        </Stack>
      </div>
    </div>
  );
};
