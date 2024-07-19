import React, { useEffect, useState } from "react";
import "./Todo.css";
import Todocards from "./Todocards";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";

import axios from "axios";

let id = sessionStorage.getItem("id");
let toupdatearray = [];

const Todo = () => {
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [array, setArray] = useState([]);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title or Body should not be empty");
    } else {
      if (id) {
        await axios
          .post(`https://taskmanager-y5qh.onrender.com/api/v2/addTask`, {
            title: inputs.title,
            body: inputs.body,
            id: id,
          })
          .then((res) => {
            console.log(res);
          });
        // setArray([...array, inputs]);
        //  console.log({ array });
        setInputs({ title: "", body: "" });
        toast.success("Your task added successfully");
      } else {
        setArray([...array, inputs]);
        //  console.log({ array });
        setInputs({ title: "", body: "" });
        toast.success("Your task added successfully");
        toast.error("Your task is not saved please signup");
      }

      // console.log({ inputs });
      // setArray([...array, inputs]);
      // console.log({ array });
      // setInputs({ title: "", body: "" });
      // toast.success("Your task added successfully");
      // toast.error("Your task is not saved please signup");
    }
  };

  const showbody = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const del = async (cardid) => {
    if (id) {
      await axios
        .delete(
          `https://taskmanager-y5qh.onrender.com/api/v2/deleteTask/${cardid}`,
          {
            data: { id: id },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
        });
      // array.splice(id, "1");
      // setArray([...array]);
    } else {
      toast.error("Please Signup First");
    }
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        await axios
          .get(`https://taskmanager-y5qh.onrender.com/api/v2/getTasks/${id}`)
          .then((res) => {
            setArray(res.data.list);
          });
      };

      fetch();
    }
  }, [submit]);

  const update = async (value) => {
    toupdatearray = array[value];
  };

  return (
    <>
      <div className="todo my-4">
        <ToastContainer />
        <div className="todo-main container d-flex flex-column justify-content-center align-items-center my-4">
          <div className="d-flex flex-column todo-inputs w-100 my-4">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2"
              name="title"
              value={inputs.title}
              onClick={showbody}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="BODY"
              className="my-2 p-2"
              name="body"
              value={inputs.body}
              onChange={change}
            />
          </div>
          <div className="w-lg-50 w-100 d-flex justify-content-end ">
            <button className="home-btn px-2 py-1 my-2" onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {array &&
                array.map((item, index) => (
                  <div
                    className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                    key={index}
                  >
                    {/* //here col 8 is for small screen */}
                    <Todocards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateid={index}
                      tobeupdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update display={dis} update={toupdatearray} />
        </div>
      </div>
    </>
  );
};

export default Todo;
