import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const [state, setState] = useState({
        name: "Rahul",
        class: "5b"
    });

    const update = () => {
        setTimeout(() => {
            setState({
                name: "Rishi",
                class: "8b"
            });
        }, 1000);
    };

    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
