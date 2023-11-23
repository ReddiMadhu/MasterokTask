import React, { useState } from "react";
import ProjectForm from "./ProjectForm";

const RenameProject=({project,setShowModel})=>{
    const [newProjectName,setnewprojectName]=useState(project.name);
    function handleSubmit(e){
        
    }
    return(
        <div className="RenameProject">
            <ProjectForm
                    handleSubmit={handleSubmit}
                    heading='Edit project name!'
                    value={newProjectName}
                    setValue={setnewprojectName}
                    setShowModel={setShowModel}
                    confirmButtonText='confirm'
                />      
        </div>
    )
}

export default RenameProject;