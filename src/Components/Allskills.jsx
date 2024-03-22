import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

const AllSkills = () => {
  const [skill, setSkill] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_URL}/api/skills/allskill`)
      .then((response) => {
        setSkill(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function deleteSkill(skillId) {
    await axios
      .delete(
        `${import.meta.env.VITE_REACT_APP_URL}/api/skills/delete/${skillId}`
      )
      .then((response) => {
        setSkill((prev) => prev.filter((item) => item._id !== skillId));
        toast.success(response.data.msg, { position: "bottom-left" });
        navigate("/allskill");
      })
      .catch(() => {
        toast.error("Internal Server Error", { position: "bottom-left" });
      });
  }

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="w-2/3 h-full mt-[5vw] border-4 p-3 border-zinc-400 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-md relative ">
        <div className="flex items-center justify-end gap-2 flex-wrap">
          <Link to={"/addskill"}>
            <button className=" border-2 border-blue-400 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-zinc-300 ">
              Add skill
            </button>
          </Link>
          <Link to={"/"}>
            <button className=" border-2 border-blue-400 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-zinc-300 ">
              Projects
            </button>
          </Link>
        </div>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Skills</th>
              <th className="px-10">Actions</th>
            </tr>
          </thead>
          {skill.map((item) => {
            return (
              <tbody key={item._id}>
                <tr>
                  <td className="pt-2">{item.skill}</td>
                  <td className="pl-10 pt-2">
                    <Link to={`/updateskill/${item._id}`}>
                      <button className="bg-blue-200 text-zinc-700 rounded-lg">
                        <BorderColorOutlinedIcon />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteSkill(item._id)}
                      className="bg-red-300 text-red-900 rounded-md mt-2"
                    >
                      <DeleteOutlinedIcon />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default AllSkills;
