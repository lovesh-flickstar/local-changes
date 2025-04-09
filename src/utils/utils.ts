export const determineIdentifierType = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (emailRegex.test(value)) return "email";
    if (phoneRegex.test(value)) return "phone";
    return "username";
  };
