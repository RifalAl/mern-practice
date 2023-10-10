import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardBody, CardFooter, Button } from "@material-tailwind/react";

import InputField from "../../shared/components/UI/Input";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Masjid Jami Tua Palopo",
    description:
      "Masjid Jami Tua Palopo merupakan masjid peninggalan Kerajaan Luwu yang berlokasi di Kota Palopo, Sulawesi Selatan. Masjid ini didirikan oleh Raja Luwu yang bernama Datu Payung Luwu XVI Pati Pasaung Toampanangi Sultan Abdullah Matinroe pada tahun 1604 M",
    address: "Jl. Andi Djemma No.88, Batupasi, Kec. Wara Utara, Kota Palopo",
    image:
      "https://www.djkn.kemenkeu.go.id/files/images/2021/06/Masjid-Jami-Tua-Palopo1.jpeg",
    location: { lat: -2.9941691069265093, long: 120.19532275826946 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Istana Luwu Palopo",
    description:
      "Kedatuan Luwu adalah salah satu kerajaan Bugis tertua. Pada 1889, Gubernur Hindia Belanda di Makassar menyatakan bahwa masa kejayaan Luwu antara abad ke-10 sampai 14",
    address: "Jl. Landau No.18, Batupasi, Kec. Wara Utara, Kota Palopo",
    image:
      "https://www.celebes.co/wp-content/uploads/2020/04/Istana-Langkanae-Luwu.jpg",
    location: { lat: -2.9944561590805225, long: 120.1964905521137 },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const identifiendPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  const navigate = useHistory();
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(data);
  }, [data]);
  const formik = useFormik({
    initialValues: {
      title: identifiendPlace?.title || "",
      description: identifiendPlace?.description || "",
      address: identifiendPlace?.address || "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, "Must be at least 5 character")
        .required("Please enter valid title"),
      description: Yup.string()
        .min(10, "Must be at least 10 character")
        .required("Please enter valid address"),
      address: Yup.string().required("Please enter valid address"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      setData({
        title: formik.values.title,
        description: formik.values.description,
        address: formik.values.address,
      });
      navigate.push("/");
    },
  });

  let content;

  if (!identifiendPlace) {
    content = (
      <Card className="w-[90%] md:w-[50%]">
        <CardBody className="text-center">Could not find place</CardBody>
      </Card>
    );
  } else {
    content = (
      <Card className="w-[90%] md:w-[50%]">
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
              Udate Place
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }
  return <div className="flex justify-center">{content}</div>;
};

export default UpdatePlace;
