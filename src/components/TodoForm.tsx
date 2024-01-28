import React, { FC } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import 'moment/locale/en-gb'; //LOCAL TIME

interface TodoFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    heading?: string;
    text: string;
    setText: (text: string) => void;
    day: Date;
    setDay: (day: Date) => void;
    time: Date;
    setTime: (time: Date) => void;
    showButtons?: boolean;
    setShowModal?: (showModal: boolean) => void;
}

//FUNCTION COMPONENT FOR TODOFORMPROPS
const TodoForm: FC<TodoFormProps> = ({
    handleSubmit,
    heading = false,
    text,
    setText,
    day,
    setDay,
    time,
    setTime,
    showButtons = false,
    setShowModal = () => {}
}) => {

    return (
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
        <form onSubmit={handleSubmit} className="TodoForm">
          <div className="text">
            {heading && <h3>{heading}</h3>}
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="To do..."
              autoFocus
            />
          </div>
          <div className="pick-day">
            <div className="title">
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
          </div>
          <div className="pick-time">
            <div className="title">
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
              onChange={(newTime) => newTime && setTime(newTime.toDate())}
            />
          </div>
          {showButtons && (
            <div>
              <div className="cancel" onClick={() => setShowModal(false)}>
                <img
                  width="22"
                  height="22"
                  src="https://img.icons8.com/fluency-systems-regular/22/multiply.png"
                  alt="multiply"
                />
              </div>
              <div className="confirm">
                <button>
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
          )}
        </form>
      </LocalizationProvider>
    );
}

export default TodoForm;
