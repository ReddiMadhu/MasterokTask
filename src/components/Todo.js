import React, {useContext, useState} from 'react'
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons'
import { doc, deleteDoc ,updateDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import moment from 'moment';
import { TodoContext } from '../context';


function Todo({todo}){
    const [hover, setHover] = useState(false)

    const { selectedTodo, setSelectedTodo } = useContext(TodoContext);


    const handleDelete = todo => {
        deleteTodo(todo)

        if(selectedTodo === todo){
            setSelectedTodo(undefined)
        }
    }

    const deleteTodo = (todo) => {
            const todoRef = doc(db, 'todos', todo.id);
        
            deleteDoc(todoRef)
            .then(() => {
                console.log('Todo deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting todo:', error);
            });
    };

    const checkTodo = (todo) => {
        const todoRef = doc(db, 'todos', todo.id);
        updateDoc(todoRef, {
            checked: !todo.checked,
        });
    };

    const repeatNextDay = (todo) => {
        const nextDayDate = moment(todo.date, 'MM/DD/YYYY').add(1, 'days');
        const repeatedTodo = {
            ...todo,
            checked: false,
            date: nextDayDate.format('MM/DD/YYYY'),
            day: nextDayDate.format('d'),
        };
        delete repeatedTodo.id;
        addDoc(collection(db, 'todos'), repeatedTodo);
    };

    return (
        <div className='Todo'>
            <div
                className="todo-container"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className="check-todo" onClick={()=>checkTodo(todo)}>
                    {
                        todo.checked ?
                        <span className="checked">
                            <CheckCircleFill color="#bebebe" />
                        </span>
                        :
                        <span className="unchecked">
                            <Circle color={todo.color} />
                        </span>
                    }
                </div>
                <div className="text" onClick={()=>{setSelectedTodo(todo)}}>
                    <p style={{color : todo.checked ? '#bebebe' : '#000000'}}>{todo.text}</p>
                    <span>{todo.time} - {todo.projectName}</span>
                    <div className={`line ${todo.checked ? 'line-through' : ''}`}></div>
                </div>
                <div className="add-to-next-day" onClick={()=>repeatNextDay(todo)}>
                    {
                        todo.checked &&
                        <span>
                            <ArrowClockwise />
                        </span>
                    }
                </div>
                <div className="delete-todo" onClick={ () => handleDelete(todo)}>
                    {
                        (hover || todo.checked) &&
                        <span>
                            <Trash />
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo