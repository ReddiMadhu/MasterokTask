import Model from './Model'
import React, {useState} from 'react'
import ProjectForm from './ProjectForm'
import { Plus } from 'react-bootstrap-icons'

function AddNewProject(){
    const [showModel, setShowModel] = useState(false)
    const [projectName, setProjectName] = useState('')
    function handleSubmit(e){

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