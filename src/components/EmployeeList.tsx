import { List } from "@material-ui/core";
import React from "react";
import { ListType } from "../types";
import EmployeeListitem from "./EmployeeListitem";

type EmployeeListProps = {
  list: ListType[];
  setList: React.Dispatch<React.SetStateAction<ListType[] | undefined>>;
};

const EmployeeList = ({ list, setList }: EmployeeListProps): JSX.Element => {
  return (
    <List>
      {list &&
        list.map((item) => (
          <EmployeeListitem key={item.id} setList={setList} item={item} />
        ))}
    </List>
  );
};

export default EmployeeList;
