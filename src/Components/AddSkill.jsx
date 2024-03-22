import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddSkill = () => {
  const navigate = useNavigate();
  const [skill, setSkill] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${import.meta.env.VITE_REACT_APP_URL}/api/skills/add`, {
        skill: skill,
      })
      .then((response) => {
        toast.success(response.data.msg, { position: "bottom-left" });
        navigate("/allskill");
      })
      .catch(() => {
        toast.error("Skill already exists", { position: "bottom-left" });
        setSkill("");
      });
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="w-2/3 h-full mt-[5vw] border-4 p-3 border-zinc-400 bg-zinc-300 rounded-md">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl font-bold">Add Skill</h1>
          <div>
            <label htmlFor="skill">Name</label>
            <input
              onChange={(e) => setSkill(e.target.value)}
              value={skill}
              type="text"
              className="block w-full p-1"
              id="skill"
              name="skill"
              placeholder="Skill"
            />
          </div>
          <div>
            <input
              type="submit"
              value={"Add"}
              className="block w-1/3 mt-2 relative left-[20vw] bg-blue-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;
