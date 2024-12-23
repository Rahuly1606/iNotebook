import React, { useContext } from "react";

import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-between align-items-center">
            {note.title}
            <span>
              <i
                className="fa-regular fa-trash-can mx-2"
                onClick={() => {
                  deleteNote(note._id);
                }}
                style={{ color: "red" }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square mx-2" onClick={updateNote}
                style={{ color: "blue" }}
              ></i>
            </span>
          </h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
