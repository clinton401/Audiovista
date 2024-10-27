import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { myContext } from "../App";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import LoaderMini from "./LoaderMini";
function CheckEmailReg() {
  const [formData, setFormData] = useState({
    email: "",

    emailError: null,
    name: "",

    nameError: null,
  });
  const {
    handlePage,
    isUserEmailRegistered,
    setIsUserEmailRegistered,
    createToast,
    authorizeUser
  } = useContext(myContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [emailSendError, setEmailSendError] = useState(null);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const { email, emailError, name, nameError } = formData;
  const verifiedEmails = [
    "dvyne0favour@gmail.com",
    "osemeblossom50@gmail.com",
    "julietphilip2000@gmail.com",
    "rsilva6420.dev@gmail.com",
    "rsilva6420@gmail.com",
    "junnywrld999@gmail.com",
    "clintonphil2000@gmail.com",
    "clintonphillips464@gmail.com",
    "aleinxkk@gmail.com",
    "asefahmed500@gmail.com",
    "keiranchipp10907@icloud.com"
  ];

  const handleFormData = (content, type) => {
    if (type === "email") {
      setIsFormSubmitted(false);
    }
    if (type === "email" && content.length > 100) {
      setFormData((prev) => {
        return {
          ...prev,
          emailError: "Email must not be more than 100 characters long.",
        };
      });
      return;
    }

    if (type === "name" && content.length > 50) {
      setFormData((prev) => {
        return {
          ...prev,
          nameError: "Name must not be more than 50 characters long.",
        };
      });
      return;
    }
    setFormData((prev) => {
      return {
        ...prev,
        nameError: type === "name" ? null : prev.nameError,
        emailError: type === "email" ? null : prev.emailError,
        [type]: content,
      };
    });
  };
  const checkEmailRegStatus = (emailValue) => {
    return verifiedEmails.some(
      (existingEmail) =>
        existingEmail.toLowerCase() === emailValue.toLowerCase()
    );
  };

  const handleEmailRegistrationStatus = async (e) => {
    e.preventDefault();
    setEmailSendError(null);
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if (!email.length > 0 || !emailPattern.test(email) || email.length > 100) {
      handleFormData(
        "Please enter a valid email address. It should not exceed 100 characters.",
        "emailError"
      );
      return;
    }
    if (name.length > 100) {
      handleFormData(
        "Name must not be more than 50 characters long.",
        "nameError"
      );
      return;
    }

    if (!isFormSubmitted) {
      const isReg = checkEmailRegStatus(email);
      setIsUserEmailRegistered(isReg);
      setIsFormSubmitted(true);
      if(isReg) {
        authorizeUser();
      }
    
      return;
    }
    const templateId = import.meta.env.VITE_REACT_TEMPLATE_ID;
    const serviceId = import.meta.env.VITE_REACT_SERVICE_ID;
    const publicKey = import.meta.env.VITE_REACT_PUBLIC_KEY;
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Clinton",
    };
    try {
      setIsRequestSent(true);
      setIsLoading(true);
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: templateParams,
          }),
        }
      );
      if (response.ok) {
        setFormData({
          email: "",

          emailError: null,
          name: "",

          nameError: null,
        });
        setIsFormSubmitted(false);
        setEmailSendError(null);
        setIsRequestSent(false);
        createToast(
          "Registration request sent! You'll receive an email once you're registered.",
          "success"
        );
        handlePage(false);
      } else {
        setEmailSendError(
          "Failed to request registration. Please try again later."
        );
      }
    } catch (error) {
      console.error(`Unable to send email: ${error}`);
      setEmailSendError(
        "Unable to request registration. Please try again later"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section
      className="flex items-center transition-all ease-in duration-300 pt-10 pb-16 text-white ipad:right-5 justify-center px-[2.5%] z-[100]  top-0   fixed w-full h-dvh blurred overflow-x-hidden ipad:max-h-[900px] "
      onClick={() => handlePage(false)}
    >
      <div
        className="w-full max-w-[500px] bg-[#333333] flex flex-col gap-4 p-4 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flex justify-between gap-x-2 gap-y-4 items-center">
          <h2 className="text-xl font-bold ">Check Status</h2>
          <button
            className="w-[35px] aspect-square text-2xl rounded-md flex items-center justify-center "
            onClick={() => handlePage(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </span>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleEmailRegistrationStatus}
        >
          <p className="text-sm text-gray-300">
            Due to Spotify's latest update this year, we need to verify your
            email before you can sign in with Spotify. Please enter the email
            associated with your Spotify account so we can check if it’s
            registered with our app:
          </p>
          <span className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs">
              Email
            </label>
            <input
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
              placeholder="Sophia123@example.com"
              value={email}
              onChange={({ target }) => handleFormData(target.value, "email")}
              className={`w-full text-sm  ${
                emailError ? "border-red-600 border" : ""
              } bg-primary hover:bg-[#1a1a1a]  focus:bg-[#1a1a1a]  font-medium outline-none rounded-md p-2 `}
            />
            {emailError && (
              <p className="text-xs text-red-600 flex items-center gap-2 flex-wrap ">
                {" "}
                {emailError}
              </p>
            )}
          </span>
          {isFormSubmitted && !isUserEmailRegistered && (
            <span className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs">
                Name(Optional)
              </label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Sophia Johnson"
                onChange={({ target }) => handleFormData(target.value, "name")}
                className={`w-full text-sm bg-primary ${
                  nameError ? " border-red-600 border" : ""
                } hover:bg-[#1a1a1a]  focus:bg-[#1a1a1a]  font-medium outline-none rounded-md p-2 `}
              />
              {nameError && (
                <p className="text-xs text-red-600 flex items-center gap-2 flex-wrap  ">
                  {" "}
                  {nameError}
                </p>
              )}
            </span>
          )}

          {isFormSubmitted && emailSendError && (
            <p className="text-xs text-red-600 flex items-center gap-2   ">
              {" "}
              {emailSendError}
            </p>
          )}
          {isFormSubmitted && !isRequestSent && !isUserEmailRegistered && (
            <p className="text-xs text-red-600 flex items-center gap-2   ">
              {" "}
              The email you entered is not registered with our app. Please enter
              the correct email or request registration using the button below.
            </p>
          )}
          {isFormSubmitted && !isRequestSent && isUserEmailRegistered && (
            <p className="text-xs text-[#1ed760] flex items-center gap-2 flex-wrap  ">
              Your email is registered with our app
            </p>
          )}

          <span className="w-full flex pt-4 justify-center ">
            {isFormSubmitted && !isUserEmailRegistered ? (
              <button
                className="filter_btn w-full  justify-center edit font-medium flex items-center "
                type="submit"
              >
                Request registration{" "}
                {isLoading && <LoaderMini playlistPage={true} />}
              </button>
            ) : (
              <button
                className="filter_btn w-full  justify-center edit font-medium flex items-center "
                type="submit"
              >
                Verify {isLoading && <LoaderMini playlistPage={true} />}
              </button>
            )}
          </span>
        </form>
      </div>
    </section>
  );
}

export default CheckEmailReg;
