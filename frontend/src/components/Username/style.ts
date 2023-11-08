import { styled } from "@mui/material/styles";

export const Input = styled('input')(({ theme }) => ({
    width: '100%',
    // height: 48,
    // fontFamily: 'termina-medium,sans-serif',
    fontSize: '12px !important',
    // marginTop: 5,
    padding: "10px 12px",
    // backgroundColor: theme.palette.text.secondary,
    // color: theme.palette.text.primary,
    // border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: 5,
    ':-webkit-autofill,:-webkit-autofill:hover, :-webkit-autofill:focus, :-webkit-autofill:active':
    {
        // WebkitBoxShadow: `0 0 0 30px ${theme.palette.text.secondary} inset !important`,
    },
    ':-webkit-autofill': {
        // WebkitTextFillColor: `${theme.palette.text.primary} !important`,
    },

}));

export const PhoneInput = styled('input')(({ theme }) => ({
    width: '100%',
    // height: 48,
    // fontFamily: 'termina-medium,sans-serif',
    fontSize: '12px !important',
    // marginTop: 5,
    padding: "10px 12px",
    // padding: "10px 12px 2px 12px",
    // backgroundColor: theme.palette.text.secondary,
    // color: theme.palette.text.primary,
    // border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: 5,
    ':-webkit-autofill,:-webkit-autofill:hover, :-webkit-autofill:focus, :-webkit-autofill:active':
    {
        // WebkitBoxShadow: `0 0 0 30px ${theme.palette.text.secondary} inset !important`,
    },
    ':-webkit-autofill': {
        // WebkitTextFillColor: `${theme.palette.text.primary} !important`,
    },

}));

