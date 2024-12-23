import React, {useContext, useState} from 'react';
import NoteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context
    const [note, setNote]=useState({title: "", description: "", tag: "default"})
    const handleclick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return(
        <div>
            <div className="container my-3">
                <h1>Add your Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">title</label>
                        <input type="text" className="form-control" id="title" name="title"
                               aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange}  />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote;