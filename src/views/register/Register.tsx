import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "react-query";
import { register as registerRequest } from "../../services/authService";
import { useNavigate } from "react-router-dom";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedType, setSelectedType] = useState("student");
  const [bio, setBio] = useState("");

  const registerMutation = useMutation(
    ({
      name,
      email,
      password,
      type,
      bio,
    }: {
      name: string;
      email: string;
      password: string;
      type: string;
      bio: string;
    }) => registerRequest(name, email, password, type, bio)
  );

  /*form validation*/
  // TODO: make sure its enough
  const validateForm = () => {
    // Perform basic validations
    if (!name || !email || !password || !bio) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      toast.error("Name can only contain letters and spaces");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address");
      return false;
    }

    if (bio.length < 5) {
      toast.error("Bio must be at least 5 characters long");
      return false;
    }

    return true;
  };

  const register = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      await registerMutation.mutateAsync({
        name,
        email,
        password,
        type: selectedType,
        bio,
      });
      toast.success("Registered successfully. You can now login.");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error("Registration failed");
      console.log(err);
    }
  };

  return (
    <div className="h-[100vh] bg-primary flex items-center justify-center flex flex-col font-display">
      <div className="w-[500px] bg-white rounded-[20px] drop-shadow-lg p-[40px]">
        <h1 className="text-2xl mb-3 font-bold">Register</h1>
        <div className="mb-3">
          <label htmlFor="name" className="block mb-2 text-sm text-gray-700">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-700">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="block mb-2 text-sm text-gray-700">
            I'm a
          </label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                value="student"
                checked={selectedType === "student"}
                onChange={() => setSelectedType("student")}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                value="company"
                checked={selectedType === "company"}
                onChange={() => setSelectedType("company")}
              />
              Company
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="block mb-2 text-sm text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>
        <button onClick={register} className="mt-4 w-full">
          Register
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default Register;
