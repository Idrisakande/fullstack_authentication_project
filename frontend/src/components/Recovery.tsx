import { Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { Input } from "./Username/style";
import { OTPFormInput } from "../constants/types";
import { CustomButton } from "./ReuseComponents/CustomButton";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../constants/helper";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Recovery = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormInput>();

  const navigate = useNavigate();

  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState<string>("");

  const handleChangeOTP = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      setOTP(event.target.value);
    } else {
      setOTP("");
    }
  };

  useMemo(() => {
    if (username) {
      generateOTP(username)
        .then((code) => {
          if (code.code) {
            toast.success("OTP has been sent to your email");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Network error, click Resend now");
        });
    }
    return;
  }, [username]);

  // handler function for sending OTP
  const sendOTP = async () => {
    const otpPromise = generateOTP(username);
    toast.promise(otpPromise, {
      loading: "Sending...",
      success: "OTP has been send to your mail!",
      error: "Could not send it!",
    });
  };

  const submitHandle: SubmitHandler<OTPFormInput> = async (
    data: OTPFormInput
  ) => {
    try {
      const { otp } = data;

      const { status } = await verifyOTP({ username: username, code: otp });

      if (status === 200) {
        toast.success("Verify successfully");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP! Check your mail again!");
    }
  };

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
          <div className="flex flex-col mt-4 gap-1 items-center text-center">
            <h1 className="text-xl font-bold xs:text-2xl sm:text-3xl">
              Re<span className="text-indigo-800">cove</span>ry
            </h1>
            <Typography
              fontSize={{ xs: 13, sm: 15 }}
              fontWeight={600}
              className="w-2/3 text-gray-400"
            >
              Enter OTP to recover password
            </Typography>
          </div>
          <div className="mt-16 flex flex-col gap-1 justify-center items-center">
            <Typography // font-medium xs:font-semibold text-sm
              fontSize={{ xs: 12, sm: 14 }}
              fontWeight={500}
              className="text-gray-400"
            >
              If you can not find OTP in your mail, click
              <button onClick={sendOTP} className="ml-1 text-blue-600">
                here
              </button>
            </Typography>
            <Typography
              fontSize={{ xs: 12, sm: 15 }}
              fontWeight={600}
              className="text-gray-400"
            >
              Enter 6 digit OTP sent to your email address.
            </Typography>
            <form
              onSubmit={handleSubmit(submitHandle)}
              className="flex flex-col gap-4 sm:gap-6 w-full justify-center items-center"
            >
              <div className="flex flex-col justify-start gap-1 w-full ">
                <Input
                  className=" bg-white shadow focus:outline-none"
                  type={"text"}
                  id="otp"
                  value={OTP}
                  placeholder="OTP"
                  {...register("otp", {
                    required: true,
                    minLength: 6,
                  })}
                  onChange={handleChangeOTP}
                />
                {errors.otp && (
                  <Typography color="red" fontSize={12} textAlign="start">
                    <>
                      *
                      {errors.otp.type === "required" &&
                        "This field is required."}
                      {errors.otp.type === "minLength" &&
                        "OTP must be 6 numbers."}
                    </>
                  </Typography>
                )}
              </div>
              <CustomButton title={"Recover"} style={{}} />
            </form>
            <Typography
              fontSize={12.5}
              fontWeight={500}
              className="text-gray-500"
            >
              Can't get OTP?{" "}
              <button
                onClick={sendOTP}
                className="ml-1 text-blue-600 font-medium xs:font-semibold text-sm"
              >
                Resend now
              </button>
            </Typography>
          </div>
        </Stack>
      </div>
    </div>
  );
};