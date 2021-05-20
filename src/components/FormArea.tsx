import React, { useState } from "react";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { ListType } from "../types";
import { calculateBMI } from "../utils/utils";
import AlertDialog from "./AlertDialog";

const useStyles = makeStyles(() => ({
  container: {
    width: 1240,
    maxWidth: "90%",
    display: "flex",
    flexDirection: "column",
    margin: "40px auto 20px",
    border: "1px solid #CCC",
    borderRadius: "6px",
    padding: "20px 40px",
    justifyContent: "center",
    alignItems: "center",
  },
  formArea: {
    width: 1060,
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },
}));

type FormAreaProps = {
  setList: React.Dispatch<React.SetStateAction<ListType[] | undefined>>;
};

const FormArea = ({ setList }: FormAreaProps): JSX.Element => {
  const classes = useStyles();
  const [id, setId] = useState<number>(0);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(25);
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(60);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [errorFirst, setErrorFirst] = useState<boolean>(false);
  const [errorLast, setErrorLast] = useState<boolean>(false);
  const [errorAge, setErrorAge] = useState<boolean>(false);
  const [errorHeight, setErrorHeight] = useState<boolean>(false);
  const [errorWeight, setErrorWeight] = useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.formArea}>
        <TextField
          error={errorFirst}
          label="名前（姓）*"
          variant="outlined"
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
        />
        <TextField
          error={errorLast}
          label="名前（名）*"
          variant="outlined"
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
        />
        <TextField
          error={errorAge}
          label="年齢*"
          variant="outlined"
          type="number"
          value={age}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAge(Number(e.target.value))
          }
        />
        <TextField
          error={errorHeight}
          label="身長（cm）*"
          variant="outlined"
          type="number"
          value={height}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setHeight(Number(e.target.value))
          }
        />
        <TextField
          error={errorWeight}
          label="体重 （kg）*"
          variant="outlined"
          type="number"
          value={weight}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWeight(Number(e.target.value))
          }
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (!firstName || !lastName || !age || !height || !weight) {
            setAlertOpen(true);
            setErrorFirst(!firstName);
            setErrorLast(!lastName);
            setErrorAge(!age);
            setErrorHeight(!height);
            setErrorWeight(!weight);
            return;
          }
          setList((prev) => {
            const currInfo: ListType = {
              id: id,
              firstName: firstName,
              lastName: lastName,
              age: age,
              height: height,
              weight: weight,
              bmi: calculateBMI(weight, height),
            };
            let list: ListType[];

            // prevが存在しない場合があるので振り分け
            list = prev ? [...prev, currInfo] : [currInfo];

            const sortedList = list.sort((a, b) => a.bmi - b.bmi);
            return sortedList;
          });

          setFirstName("");
          setLastName("");
          setAge(25);
          setHeight(170);
          setWeight(60);
          setId((prev) => prev + 1);
        }}
      >
        登録
      </Button>
      <AlertDialog open={alertOpen} setOpen={setAlertOpen} />
    </div>
  );
};

export default FormArea;
