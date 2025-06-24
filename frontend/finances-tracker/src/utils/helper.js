export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};


export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;

};



export const checkPassword= (pwd)=> {
  if (!/^\S*$/.test(pwd)) {
    return "Password must not contain whitespace.";
  }
  if (!/[A-Z]/.test(pwd)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(pwd)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/[0-9]/.test(pwd)) {
    return "Password must contain at least one digit.";
  }
  if (!/[~`!@#$%^&*()_\-+=[\]{}|\\;:'\",<.>/?]/.test(pwd)) {
    return "Password must contain at least one special symbol.";
  }
  if (pwd.length < 8 || pwd.length > 16) {
    return "Password must be between 8 and 16 characters long.";
  }
  return null; // valid
}
