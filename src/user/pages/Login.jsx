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
  const formik = useFormik({
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
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const formItems = [
    {
      name: "email",
      label: "Email",
      type: "email",
      touched: formik.touched.email,
      error: formik.errors.email,
      value: formik.values.email,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      touched: formik.touched.password,
      error: formik.errors.password,
      value: formik.values.password,
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
            Login
          </Typography>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            {formItems.map((input) => (
              <InputField
                key={input.name}
                formik={formik}
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
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
