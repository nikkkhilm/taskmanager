import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({ display, update }) => {
  useEffect(() => {
    setInputs({
      title: update.title,
      body: update.body,
    });
  }, [update]);

  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    // display("none");
  };

  const submit = async () => {
    await axios
      .put(`${window.location.origin}/api/v2/updateTask/${update._id}`, inputs)
      .then((res) => {
        toast.success(`${res.data.message}`);
        display("none");
      });
  };

  return (
    <div className="p-5 d-flex flex-column justify-content-center align-items-start update">
      <h3>Update Task</h3>
      <input
        type="text"
        name="title"
        className="todo-inputs my-4 w-100 p-3"
        placeholder="TITLE"
        value={inputs.title}
        onChange={change}
      />
      <textarea
        name="body"
        className="todo-inputs w-100 p-3"
        placeholder="BODY"
        value={inputs.body}
        onChange={change}
      ></textarea>
      <div className="d-flex justify-content-center align-items-center mx-auto">
        <button className="btn btn-dark my-4 mx-4" onClick={submit}>
          Update
        </button>
        <button
          className="btn btn-danger my-4 mx-4 px-3"
          onClick={() => {
            display("none");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
