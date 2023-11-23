import React from 'react'

const ProjectForm=({handleSubmit, heading, value, setValue, setShowModel, confirmButtonText})=>{

    return (
        <form onSubmit={handleSubmit} className='ProjectForm'>
            <h3>{heading}</h3>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type='text'
                placeholder='project name...'
                autoFocus
            />
            <button className='cancel' role='button' onClick={() => setShowModel(false)}>
                cancel
            </button>
            <button className="confirm">
                {confirmButtonText}
            </button>
        </form>
    )
}

export default ProjectForm;