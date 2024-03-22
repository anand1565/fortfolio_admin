import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, SetProject] = useState({
    title: "",
    description: "",
    skills: "",
    startDate: "",
    endDate: "",
    githubLink: "",
    deploymentLink: "",
  });

  function formatDate(inputDate) {
    // Parse the input date string into a Date object
    var parsedDate = new Date(inputDate);

    // Extract year, month, and day components
    var year = parsedDate.getFullYear();
    var month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero if necessary
    var day = parsedDate.getDate().toString().padStart(2, "0"); // Add leading zero if necessary

    // Format the date as dd/mm/yyyy
    var formattedDate = year + "-" + month + "-" + day;

    return formattedDate;
  }

  const handleChange = (e) => {
    SetProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_REACT_APP_URL}/api/project/update/${id}`, {
        title: project.title,
        description: project.description,
        skills: project.skills.split(","),
        startDate: project.startDate,
        endDate: project.endDate,
        githubLink: project.githubLink,
        deploymentLink: project.deploymentLink,
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_URL}/api/project/singleproject/${id}`
      )
      .then((response) => {
        SetProject(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className=" flex items-center justify-center">
      <div className="w-2/3 h-full mt-[5vw] border-4 p-3 border-zinc-400 bg-zinc-300 rounded-md">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h1 className="text-center text-2xl font-bold">Edit Projects</h1>
          <div>
            <label htmlFor="title">Title</label>
            <input
              onChange={handleChange}
              value={project.title}
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
              value={project.description}
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
              value={project.skills}
              type="text"
              className="block w-full p-1"
              id="skills"
              name="skills"
              placeholder="Skills"
            />
          </div>

          <div>
            <label htmlFor="startDate">Start Date</label>
            <input
              onChange={handleChange}
              value={formatDate(
                new Date(project.startDate).toLocaleDateString()
              )}
              type="date"
              className=" block"
              id="startDate"
              name="startDate"
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <input
              onChange={handleChange}
              value={formatDate(new Date(project.endDate).toLocaleDateString())}
              type="date"
              className=" block"
              id="endDate"
              name="endDate"
            />
          </div>

          <div>
            <label htmlFor="githubLink">Github Link</label>
            <input
              onChange={handleChange}
              value={project.githubLink}
              type="text"
              className=" block w-full p-1"
              id="githubLink"
              name="githubLink"
              placeholder="Github Link"
            />
          </div>
          <div>
            <label htmlFor="deploymentLink">Deployment Link</label>
            <input
              value={project.deploymentLink}
              onChange={handleChange}
              type="text"
              className=" block w-full p-1"
              id="deploymentLink"
              name="deploymentLink"
              placeholder="Deployment Link"
            />
          </div>

          <div>
            <input
              type="submit"
              className="block w-1/3 mt-2 relative left-[20vw] bg-blue-400"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;
