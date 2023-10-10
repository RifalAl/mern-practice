import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardBody, CardFooter, Button } from "@material-tailwind/react";

import InputField from "../../shared/components/UI/Input";

const NewPlace = () => {
  const navigate = useHistory();
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(data);
  }, [data]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      address: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, "Must be at least 5 character")
        .required("Please enter valid title"),
      description: Yup.string()
        .min(10, "Must be at least 10 character")
        .required("Please enter valid address"),
      address: Yup.string()
        .required("Please enter valid address"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      setData({
        title: formik.values.title,
        address: formik.values.address,
      });
      navigate.push("/");
    },
  });

  return (
    <div className="flex justify-center">
      <Card className="w-[50%]">
        <form onSubmit={formik.handleSubmit}>
          <CardBody className="flex flex-col gap-5 py-10">
            <InputField
              formik={formik}
              id="title"
              name="title"
              label="Title"
              touched={formik.touched.title}
              error={formik.errors.title}
              value={formik.values.title}
            />
            <InputField
              formik={formik}
              id="description"
              name="description"
              label="Description"
              touched={formik.touched.description}
              error={formik.errors.description}
              value={formik.values.description}
              isTextArea={true}
            />
            <InputField
              formik={formik}
              id="address"
              name="address"
              label="Address"
              touched={formik.touched.address}
              error={formik.errors.address}
              value={formik.values.address}
            />
          </CardBody>
          <CardFooter className="text-right">
            <Button
              disabled={!(formik.isValid && formik.dirty)}
              color={!(formik.isValid && formik.dirty) ? "red" : "blue"}
              className={
                !(formik.isValid && formik.dirty)
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }
              type="submit"
            >
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewPlace;
