import { useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../shared/context/auth-context";
import InputField from "../../shared/components/UI/Input";
import loading from "../../assets/loading.svg";
import WarningModal from "../../shared/components/UI/WarningModal";
import useHttpClient from "../../shared/hooks/http-hooks";

const Login = () => {
  const navigate = useHistory();
  const auth = useContext(AuthContext);

  const [isSignUp, setIsSignUp] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [photoFile, setPhotoFile] = useState("");
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  const formikSignUp = useFormik({
    initialValues: {
      photo: "",
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      photo: Yup.mixed().required("Please upload an image"),
      name: Yup.string().required("name is required"),
      email: Yup.string()
        .required("email is required")
        .email("Not a proper email"),
      password: Yup.string()
        .required("password is required")
        .min(6, "password must be 6 characters long"),
    }),
    onSubmit: async () => {
      try {
        const formData = new FormData()
        formData.append("name", formikSignUp.values.name)
        formData.append("email", formikSignUp.values.email)
        formData.append("password", formikSignUp.values.password)
        formData.append("image", photoFile)
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
          "POST",
          formData
        );
        auth.login(responseData.userId, responseData.token);
        navigate.push("/");
        // console.log(responseData);
      } catch (err) {
        console.log(err);
        setOpenModal(true);
      }
      formikSignUp.values.photo = ""
    },
  });
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("email is required")
        .email("Not a proper email"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formikLogin.values.email,
            password: formikLogin.values.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
        navigate.push("/");
      } catch (err) {
        console.log(err);
        setOpenModal(true);
      }
      formikLogin.resetForm();
    },
  });
  const changePhotohandler = (e) => {
    formikSignUp.handleChange(e);
    setPhotoFile(e.target.files[0])
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewPhotoUrl(fileReader.result);
    };
    fileReader.readAsDataURL(e.target.files[0] || "");
  };

  const formSignUpItems = [
    {
      name: "photo",
      label: "Photo",
      type: "file",
      touched: formikSignUp.touched.photo,
      error: formikSignUp.errors.photo,
      value: formikSignUp.values.photo,
      onChangePhoto: changePhotohandler,
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      touched: formikSignUp.touched.name,
      error: formikSignUp.errors.name,
      value: formikSignUp.values.name,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      touched: formikSignUp.touched.email,
      error: formikSignUp.errors.email,
      value: formikSignUp.values.email,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      touched: formikSignUp.touched.password,
      error: formikSignUp.errors.password,
      value: formikSignUp.values.password,
    },
  ];

  const formLoginItems = [
    {
      name: "email",
      label: "Email",
      type: "email",
      touched: formikLogin.touched.email,
      error: formikLogin.errors.email,
      value: formikLogin.values.email,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      touched: formikLogin.touched.password,
      error: formikLogin.errors.password,
      value: formikLogin.values.password,
    },
  ];

  const isSignUpHandler = () => {
    setIsSignUp((prevItem) => !prevItem);
    formikSignUp.values.photo = ""
  };

  const toogleModal = () => {
    setOpenModal((prevItem) => !prevItem);
  };

  return (
    <div className="flex justify-center items-center h-screen mt-[-65px]">
      <WarningModal
        toogleModal={toogleModal}
        openModal={openModal}
        message={error}
        onClear={clearError}
      />
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography
            variant="h3"
            color="white"
            className="flex gap-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            {isSignUp ? "Sign Up" : "Login"}
          </Typography>
        </CardHeader>
        {isLoading ? (
          <CardBody className="flex justify-center">
            <img className="w-[150px]" src={loading} alt="loading" />
          </CardBody>
        ) : isSignUp ? (
          <form onSubmit={formikSignUp.handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              {formikSignUp.values.photo && (
                <div className="flex justify-center">
                  <img
                    className="w-[150px] h-[150px] object-cover rounded-lg mb-5"
                    src={previewPhotoUrl}
                    alt=""
                  />
                </div>
              )}
              {formSignUpItems.map((input) => (
                <InputField
                  key={input.name}
                  formik={formikSignUp}
                  id={input.name}
                  name={input.name}
                  label={input.label}
                  type={input.type}
                  touched={input.touched}
                  error={input.error}
                  value={input.value}
                  onChangePhoto={input.onChangePhoto}
                />
              ))}
            </CardBody>

            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Sign Up
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Already have account?
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  <span onClick={isSignUpHandler}>login</span>
                </Typography>
              </Typography>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={formikLogin.handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              {formLoginItems.map((input) => (
                <InputField
                  key={input.name}
                  formik={formikLogin}
                  id={input.name}
                  name={input.name}
                  label={input.label}
                  type={input.type}
                  touched={input.touched}
                  error={input.error}
                  value={input.value}
                />
              ))}
            </CardBody>

            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Login
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Dont have an account?
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  <span onClick={isSignUpHandler}>Sign Up</span>
                </Typography>
              </Typography>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Login;
