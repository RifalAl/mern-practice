import ReactDOM from "react-dom";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import MapViewer from "../../shared/components/UI/MapViewer";

const PlaceModal = ({ toogleModal, openModal, coordinates, address }) => {
  const content = (
    <>
      <Dialog open={openModal} handler={toogleModal} size="lg">
        <DialogHeader className="bg-[#ff0055] text-white rounded-t-lg shadow-md text-lg md:text-2xl">{address}</DialogHeader>
        <DialogBody divider className="p-0">
          <MapViewer lat={coordinates.lat} long={coordinates.long}/>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={toogleModal}>
            <span>Ok</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

export default PlaceModal;
