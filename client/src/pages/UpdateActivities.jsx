import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ActivitiesService from "../services/activity.sevice";
import Swal from "sweetalert2";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState({
    name: "",
    description: "",
    type: "",
    level: "",
    team_size: 1,
    date: "",
    location: "",
    reg_open: Date,
    reg_close: Date,
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    status: "draft",
  });

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const updateActivity = await ActivitiesService.getActivitiesById(id);
        if (updateActivity.status === 200) {
          setActivity(updateActivity.data);
        } else {
          Swal.fire({
            title: "Activity Not Found",
            icon: "error",
            text: `No Activity found with ID: ${id}`,
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error fetching activities",
          icon: "error",
          text: error.message,
        });
      }
    };
    fetchActivity();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateActivity = await ActivitiesService.UpdateActivities(
        id,
        activity
      );
      if (updateActivity.status === 200) {
        setActivity(updateActivity.data);
        Swal.fire({
          title: "Activity Updated",
          icon: "success",
          text: "Successfully updated activity.",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error updating activity",
        icon: "error",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-2xl shadow-2xl bg-white rounded-2xl border border-blue-300">
        <div className="card-body space-y-6">
          <h1 className="text-3xl font-extrabold text-center text-blue-700 drop-shadow">
            ➕ แก้ไขข้อมูลกิจกรรมวันวิทยาศาสตร์
          </h1>
          <p className="text-center text-gray-600 text-sm">
            แก้ไขข้อมูลกิจกรรมให้ครบถ้วน
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-control">
              <label className="label font-semibold text-blue-800">
                ชื่อกิจกรรม
              </label>
              <input
                type="text"
                placeholder="ชื่อกิจกรรม"
                className="input input-bordered input-primary rounded-xl"
                name="name"
                onChange={handleChange}
                value={activity.name}
                required
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label font-semibold text-blue-800">
                รายละเอียดกิจกรรม
              </label>
              <textarea
                className="textarea textarea-bordered textarea-primary rounded-xl"
                placeholder="รายละเอียด"
                name="description"
                onChange={handleChange}
                value={activity.description}
                required
              />
            </div>

            {/* Type & Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-semibold text-blue-800">
                  ประเภทกิจกรรม
                </label>
                <input
                  type="text"
                  className="input input-bordered input-primary rounded-xl"
                  name="type"
                  onChange={handleChange}
                  value={activity.type}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-blue-800">
                  ระดับ
                </label>
                <input
                  type="text"
                  className="input input-bordered input-primary rounded-xl"
                  name="level"
                  onChange={handleChange}
                  value={activity.level}
                  required
                />
              </div>
            </div>

            {/* Team Size & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-semibold text-blue-800">
                  จำนวนสมาชิกต่อทีม
                </label>
                <input
                  type="number"
                  className="input input-bordered input-primary rounded-xl"
                  name="team_size"
                  min={1}
                  onChange={handleChange}
                  value={activity.team_size}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-blue-800">
                  วันที่แข่งขัน
                </label>
                <input
                  type="date"
                  className="input input-bordered input-primary rounded-xl"
                  name="date"
                  onChange={handleChange}
                  value={activity.date}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label font-semibold text-blue-800">
                สถานที่จัดกิจกรรม
              </label>
              <input
                type="text"
                className="input input-bordered input-primary rounded-xl"
                name="location"
                onChange={handleChange}
                value={activity.location}
                required
              />
            </div>

            {/* Register Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-semibold text-blue-800">
                  เปิดรับสมัคร
                </label>
                <input
                  type="datetime-local"
                  className="input input-bordered input-primary rounded-xl"
                  name="reg_open"
                  onChange={handleChange}
                  value={activity.reg_open}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-blue-800">
                  ปิดรับสมัคร
                </label>
                <input
                  type="datetime-local"
                  className="input input-bordered input-primary rounded-xl"
                  name="reg_close"
                  onChange={handleChange}
                  value={activity.reg_close}
                  required
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label font-semibold text-blue-800">
                  ผู้ติดต่อ
                </label>
                <input
                  type="text"
                  className="input input-bordered input-primary rounded-xl"
                  name="contact_name"
                  onChange={handleChange}
                  value={activity.contact_name}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-blue-800">
                  เบอร์โทร
                </label>
                <input
                  type="text"
                  className="input input-bordered input-primary rounded-xl"
                  name="contact_phone"
                  onChange={handleChange}
                  value={activity.contact_phone}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-blue-800">
                  อีเมล
                </label>
                <input
                  type="email"
                  className="input input-bordered input-primary rounded-xl"
                  name="contact_email"
                  onChange={handleChange}
                  value={activity.contact_email}
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center mt-6 gap-4">
              <button
                type="submit"
                className="btn btn-primary w-32 rounded-xl shadow-md hover:scale-105 transition-transform duration-200 text-white"
                onChange={handleSubmit}
              >
                ✅ แก้ไข
              </button>
              <button
                type="button"
                className="btn btn-outline btn-error w-32 rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
                onClick={() => navigate("/")}
              >
                ❌ ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;