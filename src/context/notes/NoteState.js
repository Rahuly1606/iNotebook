import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
    const notesInitial = []
        const [notes,setNotes] = useState(notesInitial)



    //Get all notes
  const getNote = async ()=>{
      //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
     method: 'GET',
     headers: {
       'content-Type': 'application/json',
       "auth-token" : localStorage.getItem('token')
     },

   });
    const json = await response.json();
      setNotes(json)
  }


  //Add a note
  const addNote = async (title, description, tag)=>{
  //TODO: API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
     method: "post",
     headers: {
       'content-Type': 'application/json',
       "auth-token" : localStorage.getItem('token')
     },
      body:JSON.stringify({title,description,tag})
   });
  const note = await response.json();
    setNotes(notes.concat(note))
  }


  //Delete a Note
  const deleteNote = async (id)=>{
  //TODO: API CALL
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
     method: "DELETE",
     headers: {
       'content-Type': 'application/json',
       "auth-token" : localStorage.getItem('token')
     },
   });
 const json = response.json()
      console.log(json)
    const newNotes = notes.filter((note)=>{ return note._id !== id})
    setNotes(newNotes)

  }
  

  // Edit a Note
 const editNote = async (id, title,description,tag)=> {
   //API CALL
   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
     method: 'PUT',
     headers: {
       'content-Type': 'application/json',
       "auth-token" : localStorage.getItem('token')
     },
      body:JSON.stringify({title, description,tag})
   });
 const json = await response.json()
console.log(json);

 let newNotes = JSON.parse(JSON.stringify(notes))
   //logic for edit note
   for (let index = 0; index < notes.length; index++) {
          const element  =notes[index];
          if (element._id === id){
            newNotes[index].title = title;
            newNotes[index].description=description;
            newNotes[index].tag = tag;
            break;
          }
          
       }
       setNotes(newNotes)
 }
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
