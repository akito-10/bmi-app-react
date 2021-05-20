import { Button, Dialog, DialogActions, makeStyles } from "@material-ui/core";
import React from "react";

type DeleteDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteHandler: () => void;
};

const useStyles = makeStyles(() => ({
  dialog: {
    padding: "20px 50px 10px",
  },
}));

const DeleteDialog = ({
  open,
  setOpen,
  deleteHandler,
}: DeleteDialogProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className={classes.dialog}>
        <p>この社員情報を削除しますか？</p>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)} color="default">
            キャンセル
          </Button>
          <Button
            onClick={() => {
              deleteHandler();
              setOpen(false);
            }}
            color="secondary"
          >
            削除
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
