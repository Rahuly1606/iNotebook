import React, {useContext, useEffect, useRef, useState} from 'react';
import NoteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";


 const Notes = ()=>{
     const context = useContext(NoteContext);
    const {notes, getNote} = context;
     useEffect(() => {
         getNote()
         //eslint-disable-next-line
     }, []);
     const ref = useRef(null)
     const [note, setNote]=useState({etitle: "", edescription: "", etag: ""})

     const updateNote = (currentNote)=>{
        ref.current.click();
        setNote({etitle: currentNote.title, edescription : currentNote.description, etag: currentNote.tag})

     }


       const handleclick = (e)=>{
           console.log("updating note..",note)
           e.preventDefault();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
            <AddNote/>
            <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                             <form>
                    <div className="mb-3">
                        <label htmlFor="etitle" className="form-label">title</label>
                        <input type="text" className="form-control" id="etitle" name="etitle"
                               aria-describedby="emailHelp" value={note.etitle} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="edescription" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="etag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>

                    </div>
                </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleclick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note}/>;
                })}
            </div>
        </>
    )
 }
export default Notes;