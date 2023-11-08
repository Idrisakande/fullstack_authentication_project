export type ButtonProps = {
    icon?: React.ReactNode;
    href?: string;
    title: string;
    style?: {};
    className?: string;
    onboardingForm?: boolean;
    onClick?: () => void;
    isLoading?: boolean
}

export type UserForInput = {
    files?: FileList | null;
    errors?: string;
    onChange?: () => void;
}

export type UserFormInput = {
    username?: string;
}

export type PassFormInput = {
    password?: string;
}

export type RegFormInput = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
//FileList | File[] | null

export type ProfileFormInput = {
    username: string;
    fullName: string;
    mobileNumber: string,
    email: string;
    address: string;
}

export type OTPFormInput = {
    otp: string;
}

export type ResetFormInput = {
    password: string;
    confirmPassword: string;
}

export type AuthStore = {
    auth: {
        username: string;
        active: boolean;
    };
    setUsername: (name: string) => void;
}

export type AuthResponse = {
    status: number;
}

export type ApiResponse = {
    profileImg: string | null;
    username: string;
    fullName: string;
    mobileNumber: string;
    email: string;
    password: string;
    address: string;
}

export type ErrorType = {
    message: string; // Assuming the error object has a 'message' property
}

export type FetchState = {
    isLoading: boolean;
    apiData: ApiResponse | undefined;
    status: number | null;
    serverError: ErrorType | null;
}
export type ProtectRoute = {
    children: React.ComponentType;
}

export type T_error_response = {
    success: boolean;
    message: string;
    error: {
      statusCode: number;
      data: [] | string | null;
      message: string;
    };
  };
