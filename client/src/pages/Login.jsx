import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const { login, user } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.login(
        logInData.email,
        logInData.password
      );

      if (currentUser.status === 200) {
        Swal.fire({
          title: "User Login",
          text: currentUser?.data?.message,
          icon: "success",
        }).then(() => {
          login(currentUser.data);
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="card w-full max-w-md shadow-xl bg-white p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h1>

        {/* Email */}
        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text text-blue-700">Email</span>
          </div>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={logInData.email}
            onChange={handleChange}
          />
        </label>

        {/* Password */}
        <label className="form-control w-full mb-6">
          <div className="label">
            <span className="label-text text-blue-700">Password</span>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            value={logInData.password}
            onChange={handleChange}
          />
        </label>

        {/* Submit Button */}
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;