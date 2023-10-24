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

import InputField from "../../shared/components/UI/Input";

const Login = () => {
  const formikSignUp = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      email: Yup.string()
        .required("email is required")
        .email("Not a proper email"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: async () => {
      // console.log("name : " +formikSignUp.values.name)
      // console.log("email : " +formikSignUp.values.email)
      // console.log("password : " +formikSignUp.values.password)
      fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formikSignUp.values.name,
          email: formikSignUp.values.email,
          password: formikSignUp.values.password
        })
      })
    },
  });

  const formItems = [
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


  return (
    <div className="flex justify-center items-center h-screen mt-[-65px]">
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
            Sign up
          </Typography>
        </CardHeader>
        <form onSubmit={formikSignUp.handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            {formItems.map((input) => (
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
                Login
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
