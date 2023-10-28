import { useContext, useState } from "react";
import { Card, CardBody, Button } from "@material-tailwind/react";
import { useHistory } from "react-router-dom/";

import AlertDialog from "../../shared/components/UI/AlertDialog";
import PlaceModal from "./PlaceModal";
import { AuthContext } from "../../shared/context/auth-context";
import useHttpClient from "../../shared/hooks/http-hooks";
import loading from "../../assets/loading.svg";
import WarningModal from "../../shared/components/UI/WarningModal";

const PlaceItem = ({
  id,
  image,
  title,
  address,
  description,
  coordinates,
  onDelete,
  creatorId
}) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useHistory();

  const toogleModal = () => setOpenModal((prevItem) => !prevItem);
  const toogleModalError = () => setOpenModalError((prevItem) => !prevItem);
  const toogleAlert = () => setOpenAlert((prevItem) => !prevItem);

  const editPageHandler = () => {
    navigate.push(`/places/${id}`);
  };

  const deletePlaceHandler = async () => {
    setOpenAlert(false);
    try {
      await sendRequest(`http://localhost:5000/api/places/${id}`, "DELETE");
      navigate.push(`/${auth.userId}/places`);
    } catch (error) {
      console.log(error);
      setOpenModalError(true);
    }
    onDelete(id);
  };

  return (
    <>
      <WarningModal
        toogleModal={toogleModalError}
        openModal={openModalError}
        message={error}
        onClear={clearError}
      />
      <PlaceModal
        toogleModal={toogleModal}
        address={address}
        openModal={openModal}
        coordinates={coordinates}
      />
      <AlertDialog
        toogleAlert={toogleAlert}
        openAlert={openAlert}
        onDelete={deletePlaceHandler}
      />
      {isLoading ? (
        <div className="flex justify-center">
          <img className="w-[150px]" src={loading} alt="loading" />
        </div>
      ) : (
        <li className="place-item mx-0 my-8">
          <Card id={id}>
            <CardBody className="place-item__content p-0">
              <div className="place-item__image w-full h-full">
                <img
                  src={`http://localhost:5000/${image}`}
                  alt={title}
                  className="w-full h-full md:h-[20rem] object-cover rounded-tl-xl rounded-tr-xl"
                />
              </div>
              <div className="place-item__info p-4 text-left">
                <h2 className="text-2xl mb-2 font-semibold text-[#292929]">
                  {title}
                </h2>
                <h3 className="text-md mb-4">{address}</h3>
                <p className="mb-0">{description}</p>
              </div>
              <div className="place-item__actions p-4 text-center border-solid border-t-2 border-t-[#ccc] flex flex-col md:flex-row justify-center md:justify-between gap-1 md:gap-8">
                <Button
                  variant="text"
                  size="sm"
                  className="flex items-center gap-3"
                  onClick={toogleModal}
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
                      d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                    />
                  </svg>
                  View on Map
                </Button>
                <div className="flex flex-col md:flex-row gap-1 md:gap-4">
                  {creatorId === auth.userId && (
                    <>
                      <Button
                        onClick={editPageHandler}
                        variant="text"
                        size="sm"
                        className="flex items-center gap-3"
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                        Edit
                      </Button>
                      <Button
                        onClick={toogleAlert}
                        variant="text"
                        color="red"
                        size="sm"
                        className="flex items-center gap-3"
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </li>
      )}
    </>
  );
};

export default PlaceItem;
