import React, { useContext, useState } from "react";
import ProjectForm from "./ProjectForm";
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { TodoContext } from "../context";
const RenameProject=({project,setShowModel})=>{
    const [newProjectName,setnewprojectName]=useState(project.name);
    const {selectedProject,setSelectedProject} =useContext(TodoContext)
    const renameProject = (project, newProjectName) => {
        const projectsRef = collection(db, 'projects');
        const q = query(projectsRef, where('name', '==', newProjectName));
        
            getDocs(q)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                alert('Project with the same name already exists!');
                } else {
                const projectRef = doc(db, 'projects', project.id);
        
                updateDoc(projectRef, {
                    name: newProjectName,
                })
                    .then(() => {
                    const todosRef = collection(db, 'todos');
                    const q = query(todosRef, where('projectName', '==', project.name));
        
                    getDocs(q)
                        .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            updateDoc(doc.ref, {
                            projectName: newProjectName,
                            });
                        });
                        })
                        .then(() => {
                        if (selectedProject === project.name) {
                            setSelectedProject(newProjectName);
                        }
                        });
                    })
                    .catch((error) => {
                    console.error('Error renaming project:', error);
                    });
                }
            })
            .catch((error) => {
                console.error('Error checking project name:', error);
            });
        };
    function handleSubmit(e){
        e.preventDefault()

        renameProject(project, newProjectName)

        setShowModel(false)
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