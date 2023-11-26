import React from "react";
import {Bell, CalendarDay, Clock, Palette, X} from 'react-bootstrap-icons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';

const TodoForm=({
    handleSubmit,
    heading = false,
    text, setText,
    day, setDay,
    time, setTime,
    todoProject,setTodoProject,
    projects,
    showButtons = false,
    setShowModel = false
})=>{
    

    return(

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit} className='TodoForm'>
                <div className="text">
                    {
                        heading && 
                        <h3>{heading}</h3>
                    }
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
                    {
                        projects.length > 0 ?
                            projects.map( project => 
                                <div
                                    className={`project ${todoProject === project.name ? "active" : ""}`}
                                    onClick={() => setTodoProject(project.name)}
                                    key={project.id}
                                >
                                    {project.name}
                                </div>    
                            )
                            :
                            <div style={{color:'#ff0000'}}>
                                Please add a project before proceeding
                            </div>
                        }
                    </div>
                </div>
                {
                    showButtons &&
                    <div>
                        <div className="cancel" onClick={() => setShowModel(false)}>
                            <X size='40' />
                        </div>
                        <div className="confirm">
                            <button>+ Add to do</button>
                        </div>
                    </div>
                }
            </form>
            </LocalizationProvider>

       
    )
}

export default TodoForm;