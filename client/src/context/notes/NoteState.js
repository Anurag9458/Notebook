import { useState } from "react";
import NoteContext from "./noteContext";
import Alert from "../../components/Alert";

const NoteState = (props) => {

  const [alert,setAlert]=useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{setAlert(null)},1500)
  }

    const host="http://localhost:5000";

  const temp=[];

  const [notes,setNotes]=useState(temp);

//Add a Note
const getNotes=async()=>{
    //API CALL

    const response=await fetch(`${host}/api/notes/fetchallnotes`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            "auth-token":localStorage.getItem('token')
        },

    });
    const json=await response.json();
    // console.log(json);
    setNotes(json);
  }


  //Add a Note
  const addNote=async(title,description,tag)=>{
    //API CALL

    const response=await fetch(`${host}/api/notes/addnote`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            "auth-token":localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})

    });
    const note=await response.json();
    setNotes(notes.concat(note));
    showAlert("Note Added Successfully","success")
  }


  //Delete a note
  const deleteNote=async (id)=>{
    //API CALL

        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
            "auth-token":localStorage.getItem('token')
        },
        // body:JSON.stringify(data)

    });
    const json=await response.json();
    console.log(json);


    const newnotes=notes.filter((note)=>note._id!==id)
    setNotes(newnotes);
    showAlert("Note Deleted Successfully","success")
  }

  //Edit a note
  const editNote=async (id,title,description,tag)=>{

    //API CALL
    
    const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            "auth-token":localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})

    });
    const json=await response.json();
    console.log(json);

    //Logic to edit 
    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
        }
    }
    setNotes(newNotes);
    showAlert("Note Updated Successfully","success")
  }


  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes,showAlert,alert}}>
      {alert && <Alert alert={alert} />}
      {props.children}</NoteContext.Provider>
  );
};

export default NoteState;
