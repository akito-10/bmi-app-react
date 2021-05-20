import { Button, Dialog, DialogActions, makeStyles } from "@material-ui/core";
import React from "react";

type AlertDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const useStyles = makeStyles(() => ({
  dialog: {
    padding: "20px 50px 10px",
  },
}));

const AlertDialog = ({ open, setOpen }: AlertDialogProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className={classes.dialog}>
        <p>必須項目に抜け漏れがあります。</p>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AlertDialog;
