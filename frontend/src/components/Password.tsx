import { InputAdornment, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "./Username/style";
import { PassFormInput } from "../constants/types";
import { CustomButton } from "./ReuseComponents/CustomButton";
import { images } from "../constants/images";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFetch } from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { verifyPassword } from "../constants/helper";
import { Toaster, toast } from "react-hot-toast";

export const Password = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);

  const response = useFetch(`/user/${username}`);

  const { isLoading, apiData, serverError } = response;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassFormInput>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setShowPassword(false);
  }, []);

  const formSubmitHandle: SubmitHandler<PassFormInput> = async (
    data: PassFormInput
  ) => {
    const { password } = data;

    if (password) {
      const loginPromise = verifyPassword(username, password);
      // toast.promise(loginPromise, {
      //   loading: "checking...",
      //   success: () => `Login successfully.`,
      //   error: () => `Invalid password.`,
      // });
      
      await loginPromise
        .then((res) => {
          const { token, message } = res?.data;
          localStorage.setItem("token", token);
          toast.success(message);
          navigate("/profile");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        })
        .finally(() => {
          // setIsLoading(false);
        });
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

  // Render the component based on the received apiData
  if (apiData) {
    const { username, profileImg } = apiData;

    return (
      <div className="max-w-[83%] mx-auto">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className: "text-xs font-semibold text-indigo-800",
          }}
        />
        <div className="flex justify-center items-center h-screen">
          <Stack
            className="flex flex-col gap-4 sm:gap-6 max-w-xs sm:max-w-sm bg-purple-50 bg-opacity-95 border-8 border-white rounded-xl px-4 py-6"
            style={{
              boxShadow: "0 10px 30px #4747470b",
            }}
          >
            <div className="flex flex-col gap-1 my-4 items-center text-center">
              <h1 className="text-xl font-bold xs:text-2xl">
                Hello <span className="text-indigo-800">{username}!</span>
              </h1>
              {/* apiData.fullName || */}
              <Typography
                fontSize={{ xs: 13, sm: 15 }}
                fontWeight={600}
                className="w-2/3 text-gray-400"
              >
                Explore more by connecting with us
              </Typography>
            </div>
            <motion.img
              src={profileImg || images.profileImg}
              alt="avater"
              className="w-20 h-20 mx-auto rounded-full border-4 border-gray-100 shadow-lg hover:border-gray-200 transition duration-500"
            />
            <form
              onSubmit={handleSubmit(formSubmitHandle)}
              className="flex flex-col gap-4 sm:gap-6 justify-center items-center mt-2"
            >
              <div className="flex flex-col gap-1 justify-start w-full">
                <div className="flex justify-center items-center w-full bg-white shadow">
                  <Input
                    className="w-full focus:outline-none"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Passsword"
                    style={{}}
                    {...register("password", {
                      required: true,
                      minLength: 8,
                      pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/,
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
              <CustomButton title={"Sign in"} style={{}} />
              <Typography
                fontSize={12.5}
                fontWeight={500}
                className="text-gray-500"
              >
                Forgot Password{" "}
                <Link
                  to="/recovery"
                  className="ml-1 text-blue-600 font-medium xs:font-semibold text-sm"
                >
                  Recover now
                </Link>
              </Typography>
            </form>
          </Stack>
        </div>
      </div>
    );
  }
  // Render default content if apiData is undefined
  return <h1>Loading...</h1>;
};
