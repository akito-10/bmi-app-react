import React, { useState } from "react";
import "./App.css";
import FormArea from "./components/FormArea";
import EmployeeList from "./components/EmployeeList";
import { ListType } from "./types";

function App(): JSX.Element {
  const [list, setList] = useState<ListType[]>();

  return (
    <div>
      <FormArea setList={setList} />
      <EmployeeList list={list!} setList={setList} />
    </div>
  );
}

export default App;
