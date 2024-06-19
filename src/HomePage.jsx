import React from "react";
import { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useRef } from "react";
import { auth, db } from "./firebase.util.js";
import Header from "./Header";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function HomePage() {
  const [activeButton, setActiveButton] = useState("todo");
  const [inputTitle, setInputTitle] = useState("");
  const [inputDes, setInputDes] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isCompleted, setIsCompleted] = useState([]);
  const editInput = useRef(null);
  const [editId, setEditId] = useState(null);
  const [user] = useAuthState(auth);

  // adding toast for adding,update and deleting
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showMovePopup, setShowMovePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);


  // access the inputs
  const handleChangeTitle = (e) => {
    setInputTitle(e.target.value);
  };

  const handleChangeDes = (e) => {
    setInputDes(e.target.value);
  };
  useEffect(() => {
    onSnapshot(collection(db,`user/${user.uid}/todos`), (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          inputTitle: doc.data().title,
          inputDes: doc.data().description,
          id: doc.id,
        }))
      );
    });
    onSnapshot(collection(db,`user/${user.uid}/isCompleted`), (snapshot) => {
      setIsCompleted(
        snapshot.docs.map((doc) => ({
          inputTitle: doc.data().title,
          inputDes: doc.data().description,
          completedOn: doc.data().completedOn,
          id: doc.id,
        }))
      );
    });
  }, []);

  // handle the click button add
  const handleAdd = (e) => {
    e.preventDefault();
    if (inputTitle.trim() !== "" && inputDes.trim() !== "") {
      addDoc(collection(db, `user/${user.uid}/todos`), {
        title: inputTitle,
        description: inputDes,
        timestamp: serverTimestamp(),
      });
      setInputTitle("");
      setInputDes("");
      setShowAddPopup(true);
      setTimeout(() => {
        setShowAddPopup(false);
      }, 2000);
    }
  };

  //edit todo
  const handleEdit = (id) => {
    const editItem = todos.find((todo) => todo.id === id);
    // setting the text into to input boxes on clicking on the edit button
    setInputTitle(editItem.inputTitle);
    setInputDes(editItem.inputDes);

    //update button
    setShowUpdate(true);

    //auto focusing on click on the edit button
    editInput.current.focus();

    // save editId in state
    setEditId(editItem);
  };

  //update todo
  const handleUpdate = () => {
    // Assuming you have some state to store the updated todos and input values
    const id = editId.id;
    updateDoc(doc(db,`user/${user.uid}/todos`, id), {
      title: inputTitle,
      description: inputDes,
    });

    // Reset input values and hide update button
    setInputTitle("");
    setInputDes("");
    setShowUpdate(false);
    setShowUpdatePopup(true);
      setTimeout(() => {
        setShowUpdatePopup(false);
      }, 2000);
  };

  //delete todo
  const handleDelete = (id) => {
    deleteDoc(doc(db,`user/${user.uid}/todos`, id));
    setShowDeletePopup(true);
      setTimeout(() => {
        setShowDeletePopup(false);
      }, 2000);
  };

  //mark as complete todo
  const handleComplete = (id) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    const completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
    const completedTodos = todos.find((todo) => todo.id === id);
    if (completedTodos) {
      addDoc(collection(db,`user/${user.uid}/isCompleted`), {
        title: completedTodos.inputTitle,
        description: completedTodos.inputDes,
        completedOn: completedOn,
      });
    }
    deleteDoc(doc(db,`user/${user.uid}/todos`, id));
      setShowMovePopup(true);
      setTimeout(() => {
        setShowMovePopup(false);
      }, 2000);
  };

  //todo tasks
  const todoTask = () => {
    setActiveButton("todo");
  };

  //completed Tasks
  const completedTask = () => {
    setActiveButton("completed");
  };

  //delete completed todo
  const handleDeleteCompleted = (id) => {
    deleteDoc(doc(db, `user/${user.uid}/isCompleted`, id));
    setShowDeletePopup(true);
      setTimeout(() => {
        setShowDeletePopup(false);
      }, 2000);
  };
  return (
    <>
    <Header />

    {/* popups */}
    

{showAddPopup && <div id="toast-success" class="absolute  left-[5.5%] sm:left-[25%] md:left-[29%] lg:left-[40%] top-24 flex items-center mx-auto w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">Todo added successfully.</div>
</div>}
{showUpdatePopup && <div id="toast-success" class="absolute  left-[5.5%] sm:left-[25%] md:left-[29%] lg:left-[40%] top-24 flex items-center mx-auto w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">Todo updated successfully.</div>
    
</div>}
{showMovePopup && <div id="toast-success" class="absolute  left-[5.5%] sm:left-[25%] md:left-[29%] lg:left-[40%] top-24 flex items-center mx-auto w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">Todo moved successfully.</div>
    
</div>}
{showDeletePopup && <div id="toast-danger" class="absolute  left-[5.5%] sm:left-[25%] md:left-[29%] lg:left-[40%] top-24 flex items-center mx-auto w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
        <span class="sr-only">Error icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">Todo has been deleted.</div>
</div>}

     <h1 className='font-bold text-3xl mt-8 mb-6 text-center'>My Tasks</h1>
    <div
      id="todoWrapper"
      className="bg-[#353434]  p-[2%] w-[90vw] mx-auto sm:w-fit md:w-fit lg:w-fit sm:mx-auto lg:mx-auto md:mx-auto mt-[3%] max-h-[90vh] overflow-y-auto shadow-[0_5px_7px_rgba(27,27,27)]"
    >
      
      <div className="sm:flex md:flex lg:flex sm:items-center  md:items-center lg:items-center sm:justify-center md:justify-center lg:justify-center border-b-[1px] border-[rgb(78,78,78)] py-6">
        <div className="sm:flex md:flex lg:flex sm:flex-col md:flex-col lg:flex-col sm:items-[flex-start] lg:items-[flex-start] md:items-[flex-start]  sm:mr-6 md:mr-6 lg:mr-6 flex justify-center items-center">
          <label className="font-medium mb-[10px] mr-6">Title:</label>
          <input autoCapitalize="words"
            ref={editInput}
            className="text-black  p-2 border-none sm:w-64 md:w-64 lg:w-64 w-72 focus:outline-2 focus:outline-[rgb(0,230,122)]"
            type="text"
            placeholder="What is your task title?"
            onChange={handleChangeTitle}
            value={inputTitle}
          />
        </div>
        <div className="sm:flex md:flex lg:flex sm:flex-col md:flex-col lg:flex-col sm:items-[flex-start] lg:items-[flex-start] md:items-[flex-start] sm:mr-6 md:mr-6 lg:mr-6 sm:mt-0 md:mt-0 lg:mt-0 mt-3 flex justify-center items-center ">
          <label className="font-medium mb-[10px] mr-1">Description:</label>
          <input
            className="text-black p-2 border-none w-64 focus:outline-2 focus:outline-[rgb(0,230,122)]"
            type="text"
            placeholder="What is your task description?"
            onChange={handleChangeDes}
            value={inputDes}
          />
        </div>
        {!showUpdate && (
          <div className="flex justify-center">
            <button
              className="bg-[rgb(0,230,122)] text-white border-none rounded-none sm:mt-8 md:mt-8 lg:mt-8 p-[10px] sm:w-[60px] md:w-[60px] lg:w-[60px] w-[90vw] cursor-pointer hover:bg-[rgb(4,196,106)] mt-6 "
              type="button"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        )}
        {showUpdate && (
          <div className="flex justify-center">
            <button
              className=" bg-[rgb(0,230,122)] text-white border-none rounded-none sm:mt-8 md:mt-8 lg:mt-8 p-[10px] font-bold sm:w-[70px] md:w-[70px] lg:w-[70px] w-[90vw] cursor-pointer hover:bg-[rgb(4,196,106)] mt-6 sm:-ml-3 md:-ml-3 lg:-ml-3"
              type="button"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        )}
      </div>

      <div className="mb-4 ">
        <button
          type="button"
          className={`bg-[${
            activeButton === "todo" ? "rgb(0,230,122)" : "#575656"
          }] text-white border-none rounded-none shadow-lg mt-6 p-[10px] w-fit cursor-pointer`}
          onClick={todoTask}
        >
          To Do
        </button>
        <button
          type="button"
          className={`bg-[${
            activeButton === "completed" ? "rgb(0,230,122)" : "#575656"
          }] text-white border-none rounded-none shadow-lg mt-6 p-[10px] w-fit cursor-pointer`}
          onClick={completedTask}
        >
          Completed
        </button>
      </div>
      {activeButton === "todo" &&
        todos.map((item) => {
          return (
            <div key={item.id} className="todoo flex  bg-[#414040] shadow-xl">
              <div className="bg-[#414040] flex  flex-col justify-between p-3 mb-[10px] w-[70vw]">
                <h3 className="font-bold text-2xl text-[rgb(0,230,122)] m-0">
                  {item.inputTitle}
                </h3>
                <p className="text-xs text-[161,161,161] mt-2">
                  {item.inputDes}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <FaEdit
                  id={item.id}
                  onClick={() => handleEdit(item.id)}
                  className="mx-1 text-xl cursor-pointer hover:text-[rgb(4,196,106)] sm:mr-2 md:mr-2 lg:mr-2"
                />
                <FaCheck
                  onClick={() => handleComplete(item.id)}
                  id={item.id}
                  className="text-2xl cursor-pointer ml-1  text-[rgb(0,230,122)] hover:text-[rgb(4,196,106)] sm:mr-2 md:mr-2 lg:mr-2 mx-1"
                />
                <MdDeleteOutline
                  onClick={() => handleDelete(item.id)}
                  id={item.id}
                  className="text-2xl cursor-pointer hover:text-[rgb(4,196,106)] sm:mr-2 md:mr-2 lg:mr-2 mr-1"
                />
              </div>
            </div>
          );
        })}

      {activeButton === "completed" &&
        isCompleted.map((item) => {
          return (
            <div key={item.id} className="todoo flex  bg-[#414040] shadow-xl">
              <div className="bg-[#414040] flex  flex-col justify-between p-3 mb-[10px] w-[70vw]">
                <h3 className="font-bold text-2xl text-[rgb(0,230,122)] m-0">
                  {item.inputTitle}
                </h3>
                <p className="text-xs text-[161,161,161] mt-2">
                  {item.inputDes}
                </p>
                <p className="text-xs text-[161,161,161] mt-2">
                  <i>Completed on: {item.completedOn}</i>
                </p>
              </div>
              <div className="flex justify-center items-center">
                <MdDeleteOutline
                  onClick={() => handleDeleteCompleted(item.id)}
                  id={item.id}
                  className="text-3xl cursor-pointer hover:text-[rgb(4,196,106)] ml-8"
                />
              </div>
            </div>
          );
        })}
    </div>
    </>
  );
}

export default HomePage;
