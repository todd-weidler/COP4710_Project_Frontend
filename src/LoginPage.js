import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function LoginPage() {
  const [isNewUser, setNewUser] = useState(false);

  const handleChangeLoginPage = () => {
    setNewUser((cur) => !cur);
  };

  return (
    <>
      {isNewUser ? (
        <SignUp handleChangeLoginPage={handleChangeLoginPage} />
      ) : (
        <SignIn handleChangeLoginPage={handleChangeLoginPage} />
      )}
    </>
  );
}
