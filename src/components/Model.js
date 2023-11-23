import React, { useRef } from "react";

const Model=({children,showModel,setShowModel})=>{

    const modelref=useRef();
    const closeModel=(e)=>{
        if(e.target==modelref.current){
            setShowModel(false);
        }
    }
    return(
        showModel && 
        <div className="Model" ref={modelref} onClick={closeModel}>
            <div className="container">
                {children}
            </div>
        </div>
    )
}
export default Model;