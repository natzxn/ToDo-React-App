// AddNewTodo.tsx
import React, { useState } from 'react';
import Modal from './Modal';
import firebase from '../firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import 'moment/locale/en-gb';
import styles from '../styles/NewTodo.module.css'

const AddNewTodo: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(() => false);
  const [formState, setFormState] = useState({
    text: '',
    day: new Date(),
    time: new Date(),
  });

  const auth = getAuth();
  const user = auth.currentUser; 

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formState.text) {
      if (!moment(formState.day).isValid() || !moment(formState.time).isValid()) {
        console.error('Invalid date or time');
        return;
      }

      const db = collection(getFirestore(firebase), 'todos');

      try {
        const docRef = await addDoc(db, {
          userId: user?.uid,
          text: formState.text,
          date: moment(formState.day).valueOf(),
          day: moment(formState.day).format('d'),
          time: moment(formState.time).valueOf(),
          checked: false,
          color: 'black',
        });

        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }

      setShowModal(false);
      setFormState({
        text: '',
        day: new Date(),
        time: new Date(),
      });
    }
  }

  return (
    <section className={styles.AddNewTodo}>
      <div className={styles.btn}>
        <button className={styles.addTask} onClick={() => setShowModal(true)}>
          <img
            width="19"
            height="19"
            src="https://img.icons8.com/ios-glyphs/19/FFFFFF/plus-math.png"
            alt="plus-math"
          />
          New Todo
        </button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className={styles.TodoForm}>
          <LocalizationProvider
            dateAdapter={AdapterMoment}
            adapterLocale="en-gb"
          >
            <form onSubmit={handleSubmit}>
              <div className={styles.text}>
                <input
                  type="text"
                  value={formState.text}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue.trim() !== "" || inputValue === "") {
                      setFormState((prev) => ({ ...prev, text: inputValue }));
                    }
                  }}
                  placeholder="To do..."
                  autoFocus
                  maxLength={45}
                  required
                />
              </div>
              <div className={styles.pickday}>
                <div className={styles.title}>
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/fluency/35/calendar--v1.png"
                    alt="calendar--v1"
                  />
                  <p className={styles.choose}>Choose a day</p>
                </div>
                <DatePicker
                  value={moment(formState.day)}
                  onChange={(newDay) =>
                    newDay &&
                    setFormState((prev) => ({ ...prev, day: newDay.toDate() }))
                  }
                />
                {!moment(formState.day).isValid() && (
                  <div className={styles.error}>Invalid date</div>
                )}
              </div>
              <div className={styles.picktime}>
                <div className={styles.title}>
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/fluency/35/clock--v1.png"
                    alt="clock--v1"
                  />
                  <p className={styles.choose}>Choose time</p>
                </div>
                <TimePicker
                  value={moment(formState.time)}
                  onChange={(newTime) =>
                    newTime &&
                    setFormState((prev) => ({
                      ...prev,
                      time: newTime.toDate(),
                    }))
                  }
                />
                {!moment(formState.time).isValid() && (
                  <div className={styles.error}>Invalid time</div>
                )}
              </div>
              <div className={styles.buttons}>
                <div
                  className={styles.cancel}
                  onClick={() => setShowModal(false)}
                >
                  <img
                    width="22"
                    height="22"
                    src="https://img.icons8.com/fluency-systems-regular/22/multiply.png"
                    alt="multiply"
                  />
                </div>
                <div className={styles.confirm}>
                  <button type='submit' className={styles.submit}>
                    <img
                      width="19"
                      height="19"
                      src="https://img.icons8.com/ios-glyphs/19/FFFFFF/plus-math.png"
                      alt="plus-math"
                    />{" "}
                    Add task
                  </button>
                </div>
              </div>
            </form>
          </LocalizationProvider>
        </div>
      </Modal>
    </section>
  );
};

export default AddNewTodo;
