import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardBody, CardFooter, Button } from "@material-tailwind/react";

import InputField from "../../shared/components/UI/Input";
import useHttpClient from "../../shared/hooks/http-hooks";
import { AuthContext } from "../../shared/context/auth-context";
import loading from "../../assets/loading.svg";
import WarningModal from "../../shared/components/UI/WarningModal";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useHistory();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      address: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(6, "Must be at least 6 character")
        .required("Please enter valid title"),
      description: Yup.string()
        .min(10, "Must be at least 10 character")
        .required("Please enter valid address"),
      address: Yup.string().required("Please enter valid address"),
    }),
    onSubmit: async () => {
      try {
        await sendRequest(
          "http://localhost:5000/api/places",
          "POST",
          JSON.stringify({
            title: formik.values.title,
            description: formik.values.description,
            address: formik.values.address,
            creator: auth.userId,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        navigate.push("/"  );
      } catch (error) {
        console.log(error);
        setOpenModal(true);
      }
    },
  });

  const formItems = [
    {
      name: "title",
      label: "Title",
      type: "title",
      touched: formik.touched.title,
      error: formik.errors.title,
      value: formik.values.title,
      isTextArea: false,
    },
    {
      name: "description",
      label: "Description",
      type: "description",
      touched: formik.touched.description,
      error: formik.errors.description,
      value: formik.values.description,
      isTextArea: true,
    },
    {
      name: "address",
      label: "Address",
      type: "address",
      touched: formik.touched.address,
      error: formik.errors.address,
      value: formik.values.address,
      isTextArea: false,
    },
  ];

  const toogleModal = () => {
    setOpenModal((prevItem) => !prevItem);
  };

  return (
    <div className="flex justify-center">
      <WarningModal
        toogleModal={toogleModal}
        openModal={openModal}
        message={error}
        onClear={clearError}
      />
      <Card className="w-[90%] md:w-[50%]">
        <form onSubmit={formik.handleSubmit}>
          {isLoading ? (
            <CardBody className="flex justify-center">
              <img className="w-[150px]" src={loading} alt="loading" />
            </CardBody>
          ) : (
            <>
              <CardBody className="flex flex-col gap-5 py-10">
                {formItems.map((input) => (
                  <InputField
                    key={input.name}
                    formik={formik}
                    id={input.name}
                    name={input.name}
                    label={input.label}
                    touched={input.touched}
                    error={input.error}
                    value={input.value}
                    isTextArea={input.isTextArea}
                  />
                ))}
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
            </>
          )}
        </form>
      </Card>
    </div>
  );
};

export default NewPlace;
