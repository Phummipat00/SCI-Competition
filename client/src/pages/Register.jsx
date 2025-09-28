import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    school: "",
    phone: "",
    password: "",
    type: "teacher",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.register(userData);

      if (currentUser.status === 201) {
        Swal.fire({
          title: "User Registered",
          text: currentUser?.data?.message,
          icon: "success",
        }).then(() => {
          setUserData({
            email: "",
            name: "",
            school: "",
            phone: "",
            password: "",
            type: "teacher",
          });
          navigate("/login");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="card w-full max-w-md shadow-xl bg-white p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Register
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
            value={userData.email}
            onChange={handleChange}
          />
        </label>

        {/* Name */}
        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text text-blue-700">Name</span>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="input input-bordered w-full"
            value={userData.name}
            onChange={handleChange}
          />
        </label>

        {/* School */}
        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text text-blue-700">School</span>
          </div>
          <input
            type="text"
            name="school"
            placeholder="Enter your school"
            className="input input-bordered w-full"
            value={userData.school}
            onChange={handleChange}
          />
        </label>

        {/* Phone */}
        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text text-blue-700">Phone</span>
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            className="input input-bordered w-full"
            value={userData.phone}
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
            value={userData.password}
            onChange={handleChange}
          />
        </label>

        {/* Submit Button */}
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;