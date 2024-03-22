import React from "react";
import "../CSS/CreateProject.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    skills: "",
    startdate: "",
    enddate: "",
    githublink: "",
    deploymentlink: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${import.meta.env.VITE_REACT_APP_URL}/api/project/create`, {
        title: data.title,
        description: data.description,
        skills: data.skills.split(","),
        startDate: data.startdate,
        endDate: data.enddate,
        githubLink: data.githublink,
        deploymentLink: data.deploymentlink,
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="w-2/3 h-full mt-[5vw] border-4 p-3 border-zinc-400 bg-zinc-300 rounded-md">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h1 className="text-center text-2xl font-bold">Add Projects</h1>
          <div>
            <label htmlFor="title">Title</label>
            <input
              onChange={handleChange}
              type="text"
              className="block w-full p-1"
              id="title"
              name="title"
              placeholder="Project Title"
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              onChange={handleChange}
              type="text"
              className="block w-full p-1"
              id="description"
              name="description"
              placeholder="Description"
            />
          </div>
          <div>
            <label htmlFor="skills">Skills</label>
            <input
              onChange={handleChange}
              type="text"
              className="block w-full p-1"
              id="skills"
              name="skills"
              placeholder="Skills"
              value={data.skills}
            />
            {/* <div className="my-[1vw]">
              <button
                onClick={AddSkills}
                className="inline-block border-2 bg-blue-400 px-2 border-2 border-zinc-500 rounded-md"
              >
                Add
              </button>
              <button className="inline-block mx-5 bg-blue-400 border-2 border-zinc-500  px-2 rounded-md">
                Remove
              </button>
            </div> */}
          </div>
          <div>
            <label htmlFor="startdate">Start Date</label>
            <input
              onChange={handleChange}
              type="date"
              className=" block"
              id="startdate"
              name="startdate"
            />
          </div>
          <div>
            <label htmlFor="enddate">End Date</label>
            <input
              onChange={handleChange}
              type="date"
              className=" block"
              id="enddate"
              name="enddate"
            />
          </div>
          <div>
            <label htmlFor="githublink">Github Link</label>
            <input
              onChange={handleChange}
              type="text"
              className=" block w-full p-1"
              id="githublink"
              name="githublink"
              placeholder="Github Link"
            />
          </div>
          <div>
            <label htmlFor="deploymentlink">Deployment Link</label>
            <input
              onChange={handleChange}
              type="text"
              className=" block w-full p-1"
              id="deploymentlink"
              name="deploymentlink"
              placeholder="Deployment Link"
            />
          </div>
          <div>
            <input
              type="submit"
              className="block w-1/3 mt-2 relative left-[20vw] bg-blue-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
