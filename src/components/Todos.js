import React, { useContext } from "react";
import Next7Days from "./Next7Days";
import Todo from "./Todo";
import { TodoContext } from "../context";
const Todos=()=>{
    const {todos,selectedProject} =useContext(TodoContext)
    return (
        <div className='Todos'>
            <div className='selected-project'>
                {selectedProject}
            </div>
            <div className="todos">
            {
                selectedProject === "next 7 days" ?
                <Next7Days todos={todos} />
                :
                todos.map( todo => 
                    <Todo todo={todo} key={todo.key} />    
                )
            }
            </div>
        </div>
    )
}

export default Todos;

