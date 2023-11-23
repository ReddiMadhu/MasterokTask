import React, { useState } from 'react'
import { Pencil, XCircle } from 'react-bootstrap-icons'
import RenameProject from './RenameProject'
import Model from './Model'
const Project=({project, edit})=>{
    
    const [showModel,setShowModel]=useState(false);

    return (
        <div className='Project'>
            <div className="name">
                {project.name}
            </div>
            <div className="btns">
                {
                    edit ?
                    <div className="edit-delete">
                        <span className="edit" onClick={()=>{setShowModel(true)}}>
                            <Pencil size="13" />
                        </span>
                        <span className="delete">
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