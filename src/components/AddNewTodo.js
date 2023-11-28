import React, { useState,useContext ,useEffect} from "react";
import Model from "./Model";
import dayjs, { Dayjs } from 'dayjs';
import TodoForm from "./TodoForm";
import { TodoContext } from '../context'
import { collection, addDoc,getDocs,query,where } from 'firebase/firestore';
import { db } from '../firebase';
import { calendarItems } from '../constants'
import moment from 'moment'
import randomcolor from 'randomcolor'

const AddNewTodo=()=>{
    const { selectedProject } = useContext(TodoContext)

    const [showModel,setShowModel]=useState(false);
    const [text,setText]=useState('');
    const [day,setDay]=useState(dayjs('2023-11-20T21:11:54'));
    const [time,setTime]=useState(dayjs('2023-11-20T21:11:54'));
    const [todoProject, setTodoProject] = useState(selectedProject)
    const projects = [
        { id : 1, name : "personal", numOfTodos : 0 },
        { id : 2, name : "work", numOfTodos : 1 },
        { id : 3, name : "other", numOfTodos : 2 }
    ]

// Assuming day is a Day.js object
    // const handleSubmit = (e) => {

    //     e.preventDefault();

    //     if (text && !calendarItems.includes(todoProject)) {
    //     addDoc(collection(db, 'todos'), {
    //         email:JSON.parse(localStorage.getItem('user')).email,
    //         name:"",
    //         text: text,
    //         date: moment(day.toDate()).format('MM/DD/YYYY'),
    //         day: moment(day.toDate()).format('d'),
    //         time: time.format('hh:mm A'),
    //         checked: false,
    //         color: randomcolor(),
    //         projectName: todoProject,
    //         });
    //     setShowModel(false);
    //     setText('');
    //     setDay(dayjs('2023-11-20T21:11:54'));
    //     setTime(dayjs('2023-11-20T21:11:54'));
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (text && !calendarItems.includes(todoProject)) {
          // Fetch username from Users collection
          const querySnapshot = await getDocs(query(collection(db, "Users"), where("email", "==",JSON.parse(localStorage.getItem('user')).email)));
    
         
              const userDoc = querySnapshot.docs[0];
              const username = userDoc.data().name;
              
          
        
            // Add username to todo object
            const todoData = {
                email: JSON.parse(localStorage.getItem('user')).email,
                name: username,
                text: text,
                date: moment(day.toDate()).format('MM/DD/YYYY'),
                day: moment(day.toDate()).format('d'),
                time: time.format('hh:mm A'),
                checked: false,
                color: randomcolor(),
                projectName: todoProject,
            };
        
          // Add todo to Firestore database
            await addDoc(collection(db, 'todos'), todoData);
      
            setShowModel(false);
            setText('');
            setDay(dayjs('2023-11-20T21:11:54'));
            setTime(dayjs('2023-11-20T21:11:54'));
            }
    };
    useEffect( () => {
        setTodoProject(selectedProject)
    }, [selectedProject])
    return(
        <div className="AddNewTodo">
        <div className="btn">
        <button onClick={()=>{setShowModel(true)}}>
            + New Todo
        </button>
        </div>
        <Model showModel={showModel} setShowModel={setShowModel}>
        <TodoForm
                    handleSubmit={handleSubmit}
                    heading='Add new to do!'
                    text={text}
                    setText={setText}
                    day={day}
                    setDay={setDay}
                    time={time}
                    setTime={setTime}
                    todoProject={todoProject}
                    setTodoProject={setTodoProject}
                    projects={projects}
                    showButtons={true}
                    setShowModel={setShowModel}
                />
        </Model>
        </div>
    )
}

export default AddNewTodo;