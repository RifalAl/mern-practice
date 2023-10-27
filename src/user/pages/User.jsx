import { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import loading from "../../assets/loading.svg";
import WarningModal from "../../shared/components/UI/WarningModal";
import useHttpClient from "../../shared/hooks/http-hooks";

const User = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await sendRequest("http://localhost:5000/api/users");
        setData(response.users);
      } catch (err) {
        setOpenModal(true);
        console.log(err); 
      }
    };
    getUsers();
  }, [sendRequest]);

  const toogleModal = () => {
    setOpenModal((prevItem) => !prevItem);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <img className="w-[150px]" src={loading} alt="loading" />
        </div>
      ) : (
        <>
          <WarningModal
            toogleModal={toogleModal}
            openModal={openModal}
            message={error}
            onClear={clearError}
          />
          <UsersList items={data} />
        </>
      )}
    </>
  );
};

export default User;
