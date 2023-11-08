import { InputAdornment, Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "./Username/style";
import { ResetFormInput } from "../constants/types";
import { CustomButton } from "./ReuseComponents/CustomButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../store/store";
import { toast, Toaster } from "react-hot-toast";
import { resetPassword } from "../constants/helper";
import { Navigate, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/fetch.hook";

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFormInput>();

  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();

  const { isLoading, apiData, status, serverError } =
    useFetch("createResetSession");
    console.log(apiData);
    

  // useEffect(() => {
  //   if (status) {
  //     console.log(status);
  //     console.log({ apidata: apiData });
  //   }
  // }, [isLoading, apiData, status, serverError]);

  // const handleUserPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.value !== "") {
  //     setUserPassword(event.target.value);
  //   } else {
  //     setUserPassword("");
  //   }
  // };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const submitHandle: SubmitHandler<ResetFormInput> = async (
    data: ResetFormInput
  ) => {
    const { password } = data;

    const resetPromise = resetPassword(username, password);

    toast.promise(resetPromise, {
      loading: "Updating...",
      success: "Password reset successful...!",
      error: "Coudn't reset the password",
    });

    resetPromise.then(() => {
      navigate("/password");
    });
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
  if (status && status !== 201) {
    return <Navigate to={"/password"} replace={true} />;
  }

  return (
    <div className="max-w-[83%] mx-auto">
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
          className="flex flex-col gap-4 sm:gap-6 w-full max-w-sm bg-purple-50 bg-opacity-95 border-8 border-white rounded-xl px-4 py-6"
          style={{
            boxShadow: "0 10px 30px #4747470b",
          }}
        >
          <div className="flex flex-col gap-1 items-center text-center">
            <h1 className="tnb vb ext-xl font-bold xs:text-2xl sm:text-3xl">
              <span className="text-indigo-800">Reset</span> Form
            </h1>
            <Typography
              fontSize={{ xs: 13, sm: 15 }}
              fontWeight={600}
              className="w-2/3 text-gray-400"
            >
              Enter new password
            </Typography>
          </div>
          <form
            onSubmit={handleSubmit(submitHandle)}
            className="flex flex-col  gap-4 sm:gap-6 mt-20 w-full justify-center items-center"
          >
            <div className="flex flex-col w-full justify-start gap-1">
              <div className="flex justify-center items-center w-full bg-white shadow">
                <Input
                  className="w-full focus:outline-none"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Passsword"
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
            <div className="flex flex-col w-full justify-start gap-1">
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
            
            <CustomButton title={"Reset"} style={{ marginTop: "1.6rem" }} />
          </form>
        </Stack>
      </div>
    </div>
  );
};
