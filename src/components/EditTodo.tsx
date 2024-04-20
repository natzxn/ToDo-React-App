import React, { useState, useEffect, useContext } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import firebase from "../firebase";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { TodoContext } from "../context";
import styles from '../styles/EditTodo.module.css'
import todoform from '../styles/NewTodo.module.css'

function EditTodo(): JSX.Element {
  //STATE
  const [text, setText] = useState<string>("");
  const [day, setDay] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [showDeletedMessage, setShowDeletedMessage] = useState<boolean>(false);

  //CONTEXT
  const contextValue = useContext(TodoContext);
  const selectedTodo = contextValue?.selectedTodo;

  //EDIT TEXT DAY AND TIME
  useEffect(() => {
    setText(selectedTodo?.text ?? "");
    setDay(moment(selectedTodo?.date).toDate() ?? new Date()); 
    setTime(moment(selectedTodo?.time).toDate() ?? new Date());
  }, [selectedTodo]);

  //UPDATE THE DATA WHEN EDITING TODO
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedTodo || !moment(day).isValid() || !moment(time).isValid()) {
      console.error('Invalid date or time');
      return; //CATCH UNVALID DATE/TIME FROM DATE/TIME PICKERS
    }
    
    const db = getFirestore(firebase);
    const todoRef = doc(db, "todos", selectedTodo.id);
    updateDoc(todoRef, {
      text,
      date: moment(day).valueOf(),
      day: moment(day).format("d"),
      time: moment(time).valueOf(),
    }).catch((error) => { //SHOW ERROR WHEN TRYING TO UPDATE DELETED TODO
      console.error('Error updating document:', error);
      setShowDeletedMessage(true); 
      setTimeout(() => {
        setShowDeletedMessage(false);
      }, 3000);
    });
  };

  const handleCloseEdit = () => {
    setText("");
    setDay(new Date());
    setTime(new Date());
    contextValue?.setSelectedTodo(null);
  };

  return (
    <>
      {selectedTodo ? (
        <div className={styles.EditTodo}>
          <div className={styles.header}>
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/office/25/pencil-tip.png"
              alt="pencil-tip"
            />{" "}
            Edit Todo
          </div>
          <div className="container">
            <LocalizationProvider
              dateAdapter={AdapterMoment}
              adapterLocale="en-gb"
            >
              <form onSubmit={handleEditSubmit} className={todoform.TodoForm}>
                <div className={todoform.text}>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.trim() !== "" || inputValue === "") {
                        setText(inputValue);
                      }
                    }}
                    placeholder="Edit todo..."
                    autoFocus
                    maxLength={45}
                    required                    
                  />
                </div>
                <div className={todoform.pickday}>
                  <div className={todoform.title}>
                    <img
                      width="35"
                      height="35"
                      src="https://img.icons8.com/fluency/35/calendar--v1.png"
                      alt="calendar--v1"
                    />
                    <p>Choose a day</p>
                  </div>
                  <DatePicker
                    value={moment(day)}
                    onChange={(newDay) => newDay && setDay(newDay.toDate())}
                  />
                  {!moment(day).isValid() && (
                    <div className={styles.error}>Invalid date</div>
                  )}
                </div>
                <div className={todoform.picktime}>
                  <div className={todoform.title}>
                    <img
                      width="35"
                      height="35"
                      src="https://img.icons8.com/fluency/35/clock--v1.png"
                      alt="clock--v1"
                    />
                    <p>Choose time</p>
                  </div>
                  <TimePicker
                    value={moment(time)}
                    onChange={(newTime) =>
                      newTime && setTime(moment(newTime).toDate())
                    }
                  />
                  {!moment(time).isValid() && (
                    <div className={styles.error}>Invalid time</div>
                  )}
                </div>
                <div className={todoform.buttons}>
                  <div className={todoform.confirm}>
                    <button type={todoform.submit}>Confirm</button>
                  </div>
                  <div className={todoform.cancel} onClick={handleCloseEdit}>
                    <img
                      width="22"
                      height="22"
                      src="https://img.icons8.com/fluency-systems-regular/22/multiply.png"
                      alt="multiply"
                    />
                  </div>
                </div>
              </form>
            </LocalizationProvider>
          </div>
        </div>
      ) : null}
            {showDeletedMessage && (
        <div className={styles.deletedMessage}>Todo has been deleted</div>
      )}
    </>
  );
}

export default EditTodo;
