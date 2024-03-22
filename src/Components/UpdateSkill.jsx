import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const Updateskill = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [skills, setSkills] = useState({
    skill: "",
    date: "",
  });

  const handleChange = (e) => {
    setSkills({ ...skills, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_URL}/api/skills/skill/${id}`)
      .then((response) => {
        setSkills(response.data.skill);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:5000/api/skills/update/${id}`, {
        skill: skills.skill,
      })
      .then((response) => {
        toast.success(response.data.msg, { position: "bottom-left" });
        navigate("/allskill");
      })
      .catch(() => {
        toast.error("Internal server error", { position: "bottom-left" });
      });
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="w-2/3 h-full mt-[5vw] border-4 p-3 border-zinc-400 bg-zinc-300 rounded-md">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl font-bold">Update Skill</h1>
          <div>
            <label htmlFor="skill">Name</label>
            <input
              onChange={handleChange}
              value={skills.skill}
              type="text"
              className="block w-full p-1"
              id="skill"
              name="skill"
              placeholder="Skill"
              autoComplete="off"
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

export default Updateskill;
