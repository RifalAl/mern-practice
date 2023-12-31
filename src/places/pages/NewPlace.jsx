import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";

import InputField from "../../shared/components/UI/Input";
import useHttpClient from "../../shared/hooks/http-hooks";
import { AuthContext } from "../../shared/context/auth-context";
import loading from "../../assets/loading.svg";
import WarningModal from "../../shared/components/UI/WarningModal";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [openModal, setOpenModal] = useState(false);
  const [photoFile, setPhotoFile] = useState("");
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState("");
  const navigate = useHistory();
  const formik = useFormik({
    initialValues: {
      photo: "",
      title: "",
      description: "",
      address: "",
      latitude: "",
      longitude: "",
    },
    validationSchema: Yup.object({
      photo: Yup.mixed().required("Please upload an image"),
      title: Yup.string()
        .min(6, "Must be at least 6 character")
        .required("Please enter valid title"),
      description: Yup.string()
        .min(10, "Must be at least 10 character")
        .required("Please enter valid description"),
      address: Yup.string().required("Please enter an address"),
      latitude: Yup.string().required("Please enter an latitude"),
      longitude: Yup.string().required("Please enter an longitude"),
    }),
    onSubmit: async () => {
      try {
        const formData = new FormData();
        formData.append("title", formik.values.title);
        formData.append("description", formik.values.description);
        formData.append("address", formik.values.address);
        formData.append("latitude", formik.values.latitude);
        formData.append("longitude", formik.values.longitude);
        formData.append("image", photoFile);
        await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/places`,
          "POST",
          formData,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        navigate.push("/");
      } catch (error) {
        console.log(error);
        setOpenModal(true);
      }
      formik.values.photo = ""
    },
  });

  const changePhotohandler = (e) => {
    formik.handleChange(e);
    setPhotoFile(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewPhotoUrl(fileReader.result);
    };
    fileReader.readAsDataURL(e.target.files[0] || "");
  };

  const formItems = [
    {
      name: "photo",
      label: "Photo",
      type: "file",
      touched: formik.touched.photo,
      error: formik.errors.photo,
      value: formik.values.photo,
      onChangePhoto: changePhotohandler,
    },
    {
      name: "title",
      label: "Title",
      type: "title",
      touched: formik.touched.title,
      error: formik.errors.title,
      value: formik.values.title,
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
    },
    {
      name: "latitude",
      label: "Latitude",
      type: "text",
      touched: formik.touched.latitude,
      error: formik.errors.latitude,
      value: formik.values.latitude,
    },
    {
      name: "longitude",
      label: "Longitude",
      type: "text",
      touched: formik.touched.longitude,
      error: formik.errors.longitude,
      value: formik.values.longitude,
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
          <Typography variant="h5" color="blue-gray" className="px-4 pt-5">
            Add Place
          </Typography>
          {isLoading ? (
            <CardBody className="flex justify-center">
              <img className="w-[150px]" src={loading} alt="loading" />
            </CardBody>
          ) : (
            <>
              <CardBody className="flex flex-col gap-5 py-5">
                {formik.values.photo && (
                  <div className="flex justify-center">
                    <img
                      className="w-full h-[275px] object-cover rounded-lg mb-5"
                      src={previewPhotoUrl}
                      alt=""
                    />
                  </div>
                )}
                {formItems.map((input) => (
                  <InputField
                    key={input.name}
                    formik={formik}
                    id={input.name}
                    name={input.name}
                    label={input.label}
                    touched={input.touched}
                    error={input.error}
                    type={input.type}
                    value={input.value}
                    isTextArea={input.isTextArea}
                    onChangePhoto={input.onChangePhoto}
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
