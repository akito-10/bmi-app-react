import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { ListType } from "../types";
import { makeStyles } from "@material-ui/core";
import { calculateBMI } from "../utils/utils";

type EditDialogProps = ListType & {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setList: React.Dispatch<React.SetStateAction<ListType[] | undefined>>;
};

const useStyles = makeStyles(() => ({
  dialog: {
    padding: "20px 50px 10px",
  },
  inputArea: {
    display: "flex",
    flexDirection: "column",
  },
  inputName: {
    marginRight: 15,
    marginBottom: 10,
  },

  input: {
    marginBottom: 10,
  },
}));

const EditDialog = ({
  open,
  setOpen,
  setList,
  id,
  firstName,
  lastName,
  age,
  height,
  weight,
  bmi,
}: EditDialogProps): JSX.Element => {
  const classes = useStyles();
  const [editedFirstName, setEditedFirstName] = useState<string>(firstName);
  const [editedLastName, setEditedLastName] = useState<string>(lastName);
  const [editedAge, setEditedAge] = useState<number>(age);
  const [editedHeight, setEditedHeight] = useState<number>(height);
  const [editedWeight, setEditedWeight] = useState<number>(weight);

  const editHandler = () => {
    setList((prev) => {
      // 更新後のidは、現在のリストの中で最大値である必要があるので、
      // 現在の最大値を取得
      const ids = prev?.map((item) => item.id);
      const maxIdNum = Math.max(...ids!);

      const sortedList = [
        // 現在編集中以外のリストをそのまま挿入
        ...prev?.filter((curr) => curr.id !== id)!,

        // 以下、現在編集中の社員情報
        // もし値がクリアされた状態の場合、元の値を反映させる。
        {
          id: maxIdNum + 1,
          firstName: editedFirstName || firstName,
          lastName: editedLastName || lastName,
          age: editedAge || age,
          height: editedHeight || height,
          weight: editedWeight || weight,
          bmi:
            editedHeight && editedWeight
              ? calculateBMI(editedWeight, editedHeight)
              : bmi,
        },
      ].sort((a, b) => a.bmi - b.bmi);
      return sortedList;
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <div className={classes.dialog}>
        <p>この社員情報の編集</p>
        <div className={classes.inputArea}>
          <div>
            <TextField
              className={classes.inputName}
              label="名前（姓）"
              variant="outlined"
              value={editedFirstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedFirstName(e.target.value)
              }
            />
            <TextField
              className={classes.input}
              label="名前（名）"
              variant="outlined"
              value={editedLastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedLastName(e.target.value)
              }
            />
          </div>
          <TextField
            className={classes.input}
            label="年齢"
            variant="outlined"
            type="number"
            value={editedAge}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditedAge(Number(e.target.value))
            }
          />
          <TextField
            className={classes.input}
            label="身長（cm）"
            variant="outlined"
            type="number"
            value={editedHeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditedHeight(Number(e.target.value))
            }
          />
          <TextField
            className={classes.input}
            label="体重 （kg）"
            variant="outlined"
            type="number"
            value={editedWeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditedWeight(Number(e.target.value))
            }
          />
        </div>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            キャンセル
          </Button>
          <Button
            onClick={() => {
              editHandler();
              setOpen(false);
            }}
            color="primary"
          >
            確定
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default EditDialog;
