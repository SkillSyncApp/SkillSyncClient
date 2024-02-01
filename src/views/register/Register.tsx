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
  const [type, setType] = useState("");
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

  const register = async () => {
    try {
      const { data: registerRes } = await registerMutation.mutateAsync({
        name,
        email,
        password,
        type,
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
            Type
          </label>
          <input
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="block mb-2 text-sm text-gray-700">
            Bio
          </label>
          <input
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
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
