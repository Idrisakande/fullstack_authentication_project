import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "./Username/style";
import { ProfileFormInput } from "../constants/types";
import { CustomButton } from "./ReuseComponents/CustomButton";
import { images } from "../constants/images";
import { useFetch } from "../hooks/fetch.hook";
import { updateUser } from "../constants/helper";
import { Toaster, toast } from "react-hot-toast";
import { Avatar } from "@files-ui/react";

export const Profile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormInput>();
  const navigate = useNavigate();
  // const { username } = useAuthStore((state) => state.auth);

  const response = useFetch();

  const { isLoading, apiData, serverError } = response;

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (apiData) {
      const { username, fullName, email, mobileNumber, profileImg, address } =
        apiData;
      if (profileImg) {
        setImageUrl(profileImg); //show profileImg value if exist in database
      }
      if (username) {
        setValue("username", username); //show username value if exist in database
      }
      if (fullName) {
        setValue("fullName", fullName); //show fullName value if exist in database
      }
      if (mobileNumber) {
        setValue("mobileNumber", mobileNumber); //show mobileNumber value if exist in database
      }
      if (email) {
        setValue("email", email); //show email value if exist in database
      }
      if (address) {
        setValue("address", address); //show address value if exist in database
      }
    }
  }, [apiData, setValue]);

  const [imgError, setImgError] = useState<string | null>(null);

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
      setImgError(null);
    };

    reader.readAsDataURL(selectedFile);
  };


  const formSubmitHandle: SubmitHandler<ProfileFormInput> = async (
    data: ProfileFormInput
  ) => {
    try {
      if (imageUrl === null) {
        setImgError("Chose an image");
        return;
      }

      if (data) {
        const { username, fullName, mobileNumber, email, address } = data;

        const info = {
          profileImg: imageUrl,
          username: username,
          fullName: fullName,
          mobileNumber: mobileNumber,
          email: email,
          address: address,
        };
        // On main
        // Submit the form data to the backend
        const updatePromise = updateUser(info);


        toast.promise(updatePromise, {
          loading: "Updating...",
          success: () => `${username}, you have update successfully...!.`,
          error: () => "Could not update!",
        });
        setImgError(null);
      } else {
        console.log("can't find data");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  if (isLoading) {
    return (
      <h1 className="text-3xl font-bold text-purple-600 h-screen flex items-center justify-center">
        Loading...
      </h1>
    );
  }

  if (serverError) {
    return (
      <h1 className="text-xl font-semibold text-pink-600 h-screen flex items-center justify-center">
        Error: {serverError.message}
      </h1>
    );
  }

  const userLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (apiData) {
    return (
      <div className="mx-auto pb-16 max-w-[87%]">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className: "text-xs font-semibold text-indigo-800",
            style: {},
          }}
        />
        <div className="flex justify-center items-center pt-8">
          <Stack
            className="flex flex-col gap-6 md:gap-8 w-[24rem] sm:w-[35rem] bg-purple-50 bg-opacity-95 border-8 border-white rounded-xl px-4 py-6"
            style={{
              boxShadow: "0 10px 30px #4747470b",
            }}
          >
            <div className="flex flex-col gap-1 my-4 sm:my-8 items-center text-center">
              <h1 className="text-xl font-bold xs:text-2xl">
                <span className="text-indigo-800">Pro</span>file
              </h1>
              <Typography
                fontSize={{ xs: 13, sm: 15 }}
                fontWeight={600}
                className="w-2/3 text-gray-400"
              >
                You can update your details
              </Typography>
            </div>
            <form
              onSubmit={handleSubmit(formSubmitHandle)}
              className="flex flex-col gap-4 justify-center items-center mt-2 w-full"
            >
              <motion.div className="flex flex-col gap-2 justify-center items-center text-center mb-6">
               <Avatar
                  src={imageUrl || images.profileImg}
                  alt="Avatar"
                  smartImgFit={"center"}
                  changeLabel={`${
                    imageUrl === null ? `Chose image ` : `Change image `
                  }`}
                  onChange={handleFileChange}
                  // variant="circle"
                  style={{
                    width: "6.5rem",
                    height: "6.5rem",
                    borderRadius: "100%",
                    border: '6px solid white'
                  }}
                />
                {imgError !== null ? (
                  <span className="text-red-500 block text-xs rounded-sm w-fit mt-1">
                    {imgError}
                  </span>
                ) : null}
              </motion.div>

              <div className="flex flex-col gap-8 w-full">
                <div className="flex flex-col w-full sm:flex-row gap-6">
                  <div className="flex flex-col w-full gap-1">
                    <Input
                      className="w-full focus:outline-none focus:bg-white flex"
                      type={"text"}
                      id="username"
                      // value={}
                      placeholder="Username"
                      style={{}}
                      {...register("username", {
                        // required: true,
                        minLength: 2,
                        // pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                      })}
                      // ref={inputRef}
                    />
                    {errors.username && (
                      <Typography color="red" fontSize={12} textAlign="start">
                        <>
                          *
                          {errors.username.type === "required" &&
                            "This field is required."}
                          {/* {errors.fullName.type === "pattern" &&
                      " must contain at least one upper case and one special character"} */}
                          {errors.username.type === "minLength" &&
                            "Password must be at least 2 characters."}
                        </>
                      </Typography>
                    )}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <Input
                      className="w-full focus:outline-none focus:bg-white flex"
                      type={"text"}
                      id="fullName"
                      // value={}
                      placeholder="Full Name"
                      style={{}}
                      {...register("fullName", {
                        // required: true,
                        minLength: 8,
                        // pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                      })}
                      // ref={inputRef}
                    />
                    {errors.fullName && (
                      <Typography color="red" fontSize={12} textAlign="start">
                        <>
                          *
                          {errors.fullName.type === "required" &&
                            "This field is required."}
                          {/* {errors.fullName.type === "pattern" &&
                      " must contain at least one upper case and one special character"} */}
                          {errors.fullName.type === "minLength" &&
                            "Password must be at least 8 characters."}
                        </>
                      </Typography>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-full sm:flex-row gap-6">
                  <div className="flex flex-col gap-1 w-full">
                    <Input
                      className="w-full focus:outline-none"
                      type={"tel+"}
                      id="mobileNumber"
                      placeholder="Enter mobile number"
                      style={{}}
                      {...register("mobileNumber", {
                        required: true,
                        // pattern:
                        //   /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      })}
                    />
                    {errors.mobileNumber && (
                      <Typography color="red" fontSize={12} textAlign="start">
                        <>
                          *{errors.mobileNumber.message}
                          {errors.mobileNumber.type === "required" &&
                            "This field is required."}
                          {errors.mobileNumber.type === "pattern" &&
                            "Enter valid phone number. "}
                        </>
                      </Typography>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Input
                      className="w-full focus:outline-none"
                      type={"email"}
                      id="email"
                      placeholder="Email"
                      style={{}}
                      {...register("email", {
                        required: true,
                        minLength: 8,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      })}
                    />
                    {errors.email && (
                      <span className="text-red-500 block">
                        <>
                          *{errors.email.message}
                          {errors.email.type === "required" &&
                            "This field is required."}
                          {errors.email.type === "pattern" &&
                            "Email must contain @, complete and be valid. "}
                          {errors.email.type === "minLength" &&
                            "Password must be at least 8 characters."}
                        </>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <Input
                    className="w-full focus:outline-none focus:bg-white"
                    type={"text"}
                    id="address"
                    placeholder="No 12 osogbo street Ogudu Lagos, Nigeria"
                    style={{}}
                    {...register("address", {
                      // required: true,
                      minLength: 8,
                      // pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                    })}
                  />
                  {errors.address && (
                    <Typography color="red" fontSize={12} textAlign="start">
                      <>
                        *
                        {errors.address.type === "required" &&
                          "This field is required."}
                        {/* {errors.fullName.type === "pattern" &&
                      " must contain at least one upper case and one special character"} */}
                        {errors.address.type === "minLength" &&
                          "Password must be at least 8 characters."}
                      </>
                    </Typography>
                  )}
                </div>
              </div>
              <CustomButton title={"Sign in"} style={{}} />
              <Typography
                fontSize={12.5}
                fontWeight={500}
                className="text-gray-500"
              >
                come back later{" "}
                <button
                  onClick={userLogout}
                  // to="/login"
                  className="ml-1 text-blue-600 font-medium xs:font-semibold text-sm"
                >
                  Logout
                </button>
              </Typography>
            </form>
          </Stack>
        </div>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};
