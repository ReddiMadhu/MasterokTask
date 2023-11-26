import React, { useContext, useState } from 'react'
import { Pencil, XCircle } from 'react-bootstrap-icons'
import RenameProject from './RenameProject'
import Model from './Model'
import { TodoContext } from '../context'
import { doc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const Project=({project, edit})=>{
    const {setSelectedProject,defaultProject,selectedProject}=useContext(TodoContext);
    const [showModel,setShowModel]=useState(false);
    const deleteProject = (project) => {
        const projectRef = doc(db, 'projects', project.id);
        
            deleteDoc(projectRef)
            .then(() => {
                const todosRef = collection(db, 'todos');
                const q = query(todosRef, where('projectName', '==', project.name));
        
                getDocs(q)
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                    deleteDoc(doc.ref);
                    });
                })
                .then(() => {
                    if (selectedProject === project.name) {
                    setSelectedProject(defaultProject);
                    }
                });
            })
            .catch((error) => {
                console.error('Error deleting project:', error);
            });
        };
    return (
        <div className='Project'>
            <div className="name" onClick={()=>setSelectedProject(project.name)}>
                {project.name}
            </div>
            <div className="btns">
                {
                    edit ?
                    <div className="edit-delete">
                        <span className="edit" onClick={()=>{setShowModel(true)}}>
                            <Pencil size="13" />
                        </span>
                        <span className="delete" onClick={() => deleteProject(project)} >
                            <XCircle size="13" />
                        </span>
                    </div>
                    :
                    project.numOfTodos === 0 ?
                    ""
                    :
                    <div className="total-todos">
                        {project.numOfTodos}
                    </div>
                    
                }
            </div>
            <Model showModel={showModel} setShowModel={setShowModel}>
                <RenameProject project={project} setShowModel={setShowModel}>

                </RenameProject>
            </Model>
        </div>
    )
}

export default Project