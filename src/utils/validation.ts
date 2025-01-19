export const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChar
    );
};

export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const validateContactNumber = (contactNumber: string) => {
    const contactNumberRegex = /^\+?[\d\s-]{10,}$/;
    return contactNumberRegex.test(contactNumber);
}

export const validateLocation = (location: string) => {
    const locationRegex = /^Point \[x=(-?\d+\.\d+), y=(-?\d+\.\d+)\]$/;
    return location.match(locationRegex);
}