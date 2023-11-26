import Model from './Model'
import React, {useState} from 'react'
import ProjectForm from './ProjectForm'
import { Plus } from 'react-bootstrap-icons'
import { collection, getDocs, query, where,addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function AddNewProject(){
    const [showModel, setShowModel] = useState(false)
    const [projectName, setProjectName] = useState('')
    function handleSubmit(e){
        e.preventDefault();

  if (projectName) {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, where('name', '==', projectName));

        getDocs(q)
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
            addDoc(projectsRef, {
                name: projectName,
            });
            } else {
            alert('Project already exists!');
            }
        })
        .catch((error) => {
            console.error('Error getting projects:', error);
        });

    setShowModel(false);
    setProjectName('');
}
    }

    return (
        <div className='AddNewProject'>
            <div className="add-button">
                <span onClick={() => setShowModel(true)}>
                    <Plus size="20" />
                </span>
            </div>
            <Model showModel={showModel} setShowModel={setShowModel}>
                <ProjectForm
                    handleSubmit={handleSubmit}
                    heading='New project!'
                    value={projectName}
                    setValue={setProjectName}
                    setShowModel={setShowModel}
                    confirmButtonText='+ Add Project'
                />
            </Model>
        </div>
    )
}

export default AddNewProject