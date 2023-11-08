import { Button } from "@mui/material";
import { ButtonProps } from "../../../constants/types";
import { useState } from "react";
import { useMediaQuery } from "../../../constants/useMediaQuery";
import { Loader2 } from "lucide-react";

export const CustomButton = (props: ButtonProps) => {
  // const theme = useTheme();
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");

  const {
    className,
    icon,
    href,
    title,
    style,
    onClick,
    onboardingForm = false,
    isLoading,
  } = props;

  const [onHover, setOnHover] = useState(false);

  const handleMouseEnter = () => {
    setOnHover(true);
  };

  const handleMouseLeave = () => {
    setOnHover(false);
  };

  return (
    <>
      {onboardingForm ? (
        ""
      ) : (
        <Button
          type="submit"
          startIcon={icon}
          href={href}
          style={style}
          onClick={onClick}
          disabled={isLoading}
          // ${isLoading ? "bg-slate-600" : ""}
          className={`${className}`}
          sx={{
            borderRadius: isAboveMediumScreens ? 5 : 4,
            color: "white",
            width: isAboveMediumScreens ? "12rem" : "10rem",
            fontSize: isAboveMediumScreens ? 17 : 15,
            fontWeight: 600,
            backgroundColor: onHover ? "#4338ca !important" : "#3730a3",

            textTransform: "none",
            // [theme.breakpoints.up("sm")]: {
            //   display: "none",
            // },
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 text-white animate-spin" />
          ) : (
            `${title}`
          )}
        </Button>
      )}
    </>
  );
};
