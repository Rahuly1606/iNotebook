import React from 'react';
import Notes from "./Notes";

const Noteitem = (props)=>{
    const {note} = props;
    return(
        <div className="col-md-3">
            <div className="card my-3">
               <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                   <p className="card-text">{note.description}
                       <i className="fa-regular fa-trash-can mx-2 my-3"></i>
                       <i className="fa-solid fa-pen-to-square mx-2 my-3"></i>
                   </p>
               </div>
            </div>
        </div>
    )
}
export default Noteitem;