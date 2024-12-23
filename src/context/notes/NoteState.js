import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
const notesInitial =
    [
  {
    "_id": "6769005b1d41a11047224227",
    "user": "6765bebfbf2166b8357b7902",
    "title": "new Title",
    "description": "why r u not updating",
    "tag": "personal",
    "date": "2024-12-23T06:16:59.136Z",
    "__v": 0
  },
  {
    "_id": "6769005c1d41a11047224229",
    "user": "6765bebfbf2166b8357b7902",
    "title": "new Title",
    "description": "why r u not updating",
    "tag": "personal",
    "date": "2024-12-23T06:17:00.476Z",
    "__v": 0
  },
  {
    "_id": "6769005e1d41a1104722422b",
    "user": "6765bebfbf2166b8357b7902",
    "title": "new Title",
    "description": "why r u not updating",
    "tag": "personal",
    "date": "2024-12-23T06:17:02.913Z",
    "__v": 0
  },
  {
    "_id": "6769005f1d41a1104722422d",
    "user": "6765bebfbf2166b8357b7902",
    "title": "new Title",
    "description": "why r u not updating",
    "tag": "personal",
    "date": "2024-12-23T06:17:03.785Z",
    "__v": 0
  }
]
    const [notes,setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
