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
                        If the warning is not critical and you're okay with Git handling line endings automatically, you can proceed without any changes. However, aligning on a line-ending strategy helps avoid unnecessary diffs and issues when working in teams.
                    </p>
                   </div>
            </div>
        </div>
    )
}
export default Noteitem;