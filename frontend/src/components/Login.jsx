import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, user } = useUser();

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const { data } = await axios.post("/api/user/login-user", formData);
      console.log(data);
      toast.success("successfully login");

      setLoading(false);
      login(data, data.expiresIn);

      navigate("/");
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data);
      console.log(e);
    }
  };

  return (
    <div className="w-full">
      <div
        className="rounded-lg border border-slate-200 bg-white text-slate-950 
    shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Login with your info
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Login with your info
          </p>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                  peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white 
                  px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm 
                  file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                  peer-disabled:opacity-70"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white 
                  px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm 
                  file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button>{loading ? "Login" : "Login"}</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
