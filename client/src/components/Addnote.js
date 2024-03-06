import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const Addnote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const temp={ title: "", description: "", tag: "" };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote(temp);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
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
              onChange={onChange}
              value={note.title}
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
              onChange={onChange}
              minLength={5}
              value={note.description}
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

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={!note.title.length || !note.description.length}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
