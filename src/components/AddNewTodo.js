import React, { useState } from "react";
import Model from "./Model";
import {Bell, CalendarDay, Clock, Palette, X} from 'react-bootstrap-icons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';

const AddNewTodo=()=>{
    const [showModel,setShowModel]=useState(false);
    const [text,setText]=useState('');
    const [day,setDay]=useState(dayjs('2023-11-20T21:11:54'));
    const [time,setTime]=useState(dayjs('2023-11-20T21:11:54'));

    return(
        <div className="AddNewTodo">
        <div className="btn">
        <button onClick={()=>{setShowModel(true)}}>
            + New Todo
        </button>
        </div>
        <Model showModel={showModel} setShowModel={setShowModel}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form>
                <div className="text">
                    <h3>Add New Todo!</h3>
                    <input
                        type="text"
                        value={text}
                        onChange={e=>setText(e.target.value)}
                        placeholder="todo..."
                        autoFocus
                    />

                </div>
                <div className="remind">
                    <Bell/>
                    <p>Remind Me !</p>

                </div>
                <div className="pick-day">
                    <div className="title">
                        <CalendarDay/>  
                        <p>Choose a Day</p>                 
                        </div>
                        <DesktopDatePicker
                        label="Date"
                        inputFormat="MM/DD/YYYY"
                        value={day}
                        onChange={day=>setDay(day)}
                        />
                </div>
                <div className="pick-time">
                    <div className="title">
                        <Clock/>  
                        <p>Choose a time</p>                 
                        </div>
                        <TimePicker
                        label="Time"
                        value={time}
                        onChange={time=>setTime(time)}
                        />
                </div>
                <div className="pick-project">
                    <div className="title">
                        <Palette/>  
                        <p>Choose a project</p>                 
                        </div>
                    <div className="projects">
                    <div className="project active">
                        personal
                    </div>
                    <div className="project">
                        work
                    </div>
                    <div className="project">
                        work
                    </div>
                    <div className="project">
                        work
                    </div>
                    </div>
                </div>
                <div className="cancel" onClick={()=>setShowModel(false)}>
                    <X/>
                </div>
                <div className="confirm">
                    <button>+ Add to do</button>
                </div>
            </form>
            </LocalizationProvider>

        </Model>
        </div>
    )
}

export default AddNewTodo;