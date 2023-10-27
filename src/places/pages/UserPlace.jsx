import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import useHttpClient from "../../shared/hooks/http-hooks";
import WarningModal from "../../shared/components/UI/WarningModal";
import loading from "../../assets/loading.svg";

const UserPlace = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const userId = useParams().userId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/a pi/places/user/${userId}`
        );
        setData(responseData.userPlaces);
      } catch (error) {
        console.log(error);
        setOpenModal(true);
      }
    };
    getPlaces();
  }, [sendRequest, userId]);

  const toogleModal = () => {
    setOpenModal((prevItem) => !prevItem);
  };

  return (
    <>
      <WarningModal
        toogleModal={toogleModal}
        openModal={openModal}
        message={error}
        onClear={clearError}
      />
      {isLoading ? (
        <div className="flex justify-center">
          <img className="w-[150px]" src={loading} alt="loading" />
        </div>
      ) : (
        <PlaceList items={data} userId={userId} />
      )}
    </>
  );
};

export default UserPlace;
