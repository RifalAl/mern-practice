import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const AlertDialog = ({ toogleAlert, openAlert, onDelete }) => {
  return (
    <>
      <Dialog open={openAlert} handler={toogleAlert} size="sm">
        <DialogHeader className="bg-[#ff0055] text-white rounded-t-lg shadow-md text-lg md:text-2xl">
          Yakin untuk menghapus?
        </DialogHeader>
        <DialogBody divider>
          Tempat akan terhapus dan tidak dapat untuk dikembalikan lagi
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={toogleAlert}
            className="mr-1"
          >
            <span>Batal</span>
          </Button>
          <Button variant="gradient" color="red" onClick={onDelete}>
            <span>Hapus</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AlertDialog;
