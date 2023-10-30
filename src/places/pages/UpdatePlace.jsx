import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardBody, CardFooter, Button } from "@material-tailwind/react";

import InputField from "../../shared/components/UI/Input";
import loading from "../../assets/loading.svg";
import useHttpClient from "../../shared/hooks/http-hooks";
import WarningModal from "../../shared/components/UI/WarningModal";
import { AuthContext } from "../../shared/context/auth-context";

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const navigate = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const placeId = useParams().placeId;
  const [identifiendPlace, setIdentifiedPlace] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setIdentifiedPlace(responseData.place);
      } catch (error) {
        console.log(error);
        setOpenModal(true);
      }
    };
    getPlace();
  }, [placeId, sendRequest]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: identifiendPlace?.title || "",
      description: identifiendPlace?.description || "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(6, "Must be at least 6 character")
        .required("Please enter valid title"),
      description: Yup.string()
        .min(10, "Must be at least 10 character")
        .required("Please enter valid address"),
    }),
    onSubmit: async () => {
      try {
        await sendRequest(
          `http://localhost:5000/api/places/${placeId}`,
          "PATCH",
          JSON.stringify({
            title: formik.values.title,
            description: formik.values.description,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        navigate.push(`/${auth.userId}/places`);
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
  ];

  const toogleModal = () => {
    setOpenModal((prevItem) => !prevItem);
  };

  let content;

  if (isLoading) {
    content = (
      <Card className="w-[90%] md:w-[50%]">
        <CardBody className="flex justify-center">
          <img className="w-[150px]" src={loading} alt="loading" />
        </CardBody>
      </Card>
    );
  }

  if (!isLoading && !identifiendPlace) {
    content = (
      <Card className="w-[90%] md:w-[50%]">
        <CardBody className="text-center">Could not find place</CardBody>
      </Card>
    );
  }

  if (!isLoading && identifiendPlace) {
    content = (
      <Card className="w-[90%] md:w-[50%]">
        <form onSubmit={formik.handleSubmit}>
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
              Udate Place
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }
  return (
    <>
      <WarningModal
        toogleModal={toogleModal}
        openModal={openModal}
        message={error}
        onClear={clearError}
      />
      <div className="flex justify-center">{content}</div>;
    </>
  );
};

export default UpdatePlace;
