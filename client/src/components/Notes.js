import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";




const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id:"", title: "", description: "", tag: "" });
  const navigate=useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate("/login");
    }
    
  },// eslint-disable-next-line 
  []);

  const handleClick = (e) => {
    // console.log(note);
    editNote(note._id,note.title,note.description,note.tag);
    refClose.current.click();
  };

  const updateNote = (val) => {
    ref.current.click();
    setNote(val);
   
  };

  
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };


  return (
    <div className="container">
      <Addnote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <div>
      <div className="container my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="desc"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>

        
        </form>
      </div>
    </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container row my-3">
        <h2>Your Notes</h2>
        {notes.length===0 && "No Notes to display"}
        {notes.map((note) => (
          <Noteitem key={note._id} updateNote={updateNote} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
