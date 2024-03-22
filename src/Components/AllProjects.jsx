import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

const AllProjects = () => {
  const [projectDetails, SetProjectDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_URL}/api/project/allprojects`)
      .then((response) => {
        SetProjectDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteProject = async (id) => {
    await axios
      .delete(`${import.meta.env.VITE_REACT_APP_URL}/api/project/delete/${id}`)
      .then(() => {
        SetProjectDetails((item) =>
          item.filter((project) => project._id !== id)
        );
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2 my-2 mx-5">
        <button className="bg-gradient-to-r from-sky-500 to-pink-500 p-1 rounded-md  ">
          <Link to={"/allskill"}>Your skills</Link>
        </button>
        <button className="bg-gradient-to-r from-sky-500 to-pink-500 p-1 rounded-md  ">
          <Link to={"/create"}>Create Project</Link>
        </button>
      </div>
      <div className=" flex justify-center items-center flex-wrap">
        <div className="w-[75%] flex items-center justify-start gap-2 pt-4 flex-wrap">
          {projectDetails.map((project) => {
            return (
              <div
                key={project._id}
                className=" w-[18rem] min-h-60 bg-zinc-100 p-1 border-2 border-zinc-400 rounded-md relative"
              >
                <span className="absolute top-[-10px] right-0 text-zinc-500 ">
                  <Link to={`/update/${project._id}`}>
                    <ModeEditOutlineIcon fontSize="small" />
                  </Link>
                </span>
                <span
                  className="absolute top-[-10px] right-7 text-red-700"
                  onClick={() => deleteProject(project._id)}
                >
                  <DeleteIcon />
                </span>
                <h3 className="text-[20px] font-semibold">{project.title}</h3>
                <p className="text-sm min-h-16">{project.description}</p>
                <div className="w-full min-h-16 border-2 p-1 rounded-md flex flex-wrap gap-1 items-center justify-start inline-block">
                  {project.skills.map((skill, index) => {
                    return (
                      <ul key={index}>
                        <li className="bg-[#d9e8e8] border-1 rounded-md px-1">
                          {skill}
                        </li>
                      </ul>
                    );
                  })}
                </div>
                <div className="text-xs">
                  <ul className="flex gap-2 items-center justify-end w-full">
                    <li>{new Date(project.startDate).toLocaleDateString()}</li>
                    <span>-</span>
                    <li>{new Date(project.endDate).toLocaleDateString()}</li>
                  </ul>
                </div>
                <div className="flex items-center justify-start gap-2 text-sm font-semibold">
                  <button className="block p-1 text-center border-2 border-blue-400 rounded-md bg-blue-300 my-2">
                    <Link to={project.githubLink}>
                      <GitHubIcon />
                    </Link>
                  </button>
                  <button className="block p-1 text-center border-2 border-blue-400 rounded-md bg-blue-300">
                    <Link to={project.deploymentLink}>Deployment</Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllProjects;
