import React, {useContext, useState,useEffect} from 'react'
import TodoForm from './TodoForm'
import { TodoContext } from '../context'
import moment from 'moment'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import dayjs from 'dayjs';
function EditTodo(){
    const [text,setText]=useState('');
    const [day,setDay]=useState(dayjs('2023-11-20T21:11:54'));
    const [time,setTime]=useState(dayjs('2023-11-20T21:11:54'));
    const [todoProject, setTodoProject] = useState('')
    const { selectedTodo, projects } = useContext(TodoContext);
    
    useEffect(() => {
        if(selectedTodo){
            setText(selectedTodo.text)
            setDay(moment(selectedTodo.date, 'MM/DD/YYYY'))
            setTime(moment(selectedTodo.time, 'hh:mm A'))
            setTodoProject(selectedTodo.projectName)
        }
    }, [selectedTodo])
    useEffect(() => {
        if (selectedTodo) {
            const todoRef = doc(db, 'todos', selectedTodo.id);
        
            updateDoc(todoRef, {
                text,
                date: moment(day).format('MM/DD/YYYY'),
                day: moment(day).format('d'),
                time: moment(time).format('hh:mm A'),
                projectName: todoProject,
            });
        }}, [text, day, time, todoProject]);
    function handleSubmit(e){

    }
    return (
        <div>
        {
            selectedTodo &&
            <div className='EditTodo'>
                <div className="header">
                    Edit Todo
                </div>
                <div className="container">
                    <TodoForm
                        handleSubmit={handleSubmit}
                        text={text}
                        setText={setText}
                        day={day}
                        setDay={setDay}
                        time={time}
                        setTime={setTime}
                        todoProject={todoProject}
                        setTodoProject={setTodoProject}
                        projects={projects}
                    />
                </div>
            </div>
        }
    </div>
    )
}

export default EditTodo
