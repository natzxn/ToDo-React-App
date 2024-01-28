import React, { useState } from 'react';
import Modal from './Modal';
import TodoForm from './TodoForm';
import firebase from '../firebase'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import moment from 'moment';


interface AddNewTodoProps {}

const AddNewTodo: React.FC<AddNewTodoProps> = () => {

  //STATE
    const [showModal, setShowModal] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [day, setDay] = useState(new Date())
    const [time, setTime] = useState(new Date())


    //HANDLE SUMBIT
  async  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault(); //PREVENT FROM REFRESH WHEN SUBMITTING

        if (text) {
            const db = collection(getFirestore(firebase), "todos");
      
            try {
              const docRef = await addDoc(db, {
                text: text,
                date: moment(day).format('DD/MM/YYYY'),
                day: moment(day).format('d'),
                time: moment(time).format('HH:mm'),
                checked: false,
                color: 'black',
              });
      
              console.log('Document written with ID: ', docRef.id);
            } catch (error) {
              console.error('Error adding document: ', error);
            }

                setShowModal(false)
                setText('')
                setDay(new Date())
                setTime(new Date())
        }
    }

    return (
        <div className='AddNewTodo'>
            <div className="btn">
                <button onClick={() => setShowModal(true)}>
                <img width="19" height="19" src="https://img.icons8.com/ios-glyphs/19/FFFFFF/plus-math.png" alt="plus-math"/>New Todo
                </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <TodoForm 
                handleSubmit={handleSubmit}
                heading = 'Add new to do!'
                text={text}
                setText={setText}
                day={day}
                setDay={setDay}
                time={time}
                setTime={setTime}
                showButtons={true}
                setShowModal={setShowModal} 
                />
            </Modal>
        </div>
    );
}

export default AddNewTodo