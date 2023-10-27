import ReactDOM from "react-dom";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const WarningModal = ({ toogleModal, openModal, message, onClear }) => {
  const closeModal = () => {
    toogleModal();
    onClear();
  };
  const content = (
    <>
      <Dialog open={openModal} handler={toogleModal} size="sm">
        <DialogHeader className="bg-[#ff0055] text-white rounded-t-lg shadow-md text-lg md:text-2xl">
          An Error Occured! 
        </DialogHeader>
        <DialogBody divider className="p-5">
          <p className="font-xl">{message}</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={closeModal}>
            <span>Ok</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

export default WarningModal;
