import { IconButton, ListItem, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ListType } from "../types";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

type EmployeeListitemProps = {
  setList: React.Dispatch<React.SetStateAction<ListType[] | undefined>>;
  item: ListType;
};

const useStyles = makeStyles(() => ({
  listItem: {
    width: 730,
    maxWidth: "80%",
    margin: "10px auto",
    border: "1px solid #ccc",
    borderRadius: 3,
    display: "flex",
    justifyContent: "space-between",
  },
}));

const EmployeeListitem = ({
  setList,
  item,
}: EmployeeListitemProps): JSX.Element => {
  const classes = useStyles();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const deleteHandler = () => {
    setList((prev) => prev?.filter((curr) => curr.id !== item.id));
  };

  return (
    <>
      <ListItem className={classes.listItem}>
        <div>
          <span>{item.firstName}</span> <span>{item.lastName}</span>{" "}
          <span>{item.age}歳</span>
        </div>
        <div>
          <span>身長: {item.height}cm</span> <span>体重: {item.weight}kg</span>{" "}
          <span>BMI: {item.bmi}</span>
        </div>
        <div>
          <IconButton aria-label="edit">
            <EditIcon onClick={() => setEditOpen(true)} />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon onClick={() => setDeleteOpen(true)} />
          </IconButton>
        </div>
      </ListItem>
      <EditDialog
        open={editOpen}
        setOpen={setEditOpen}
        setList={setList}
        {...item}
      />
      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        deleteHandler={deleteHandler}
      />
    </>
  );
};

export default EmployeeListitem;
