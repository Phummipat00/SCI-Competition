import React, { useEffect, useState } from "react";

const ActivityCard = ({ activity }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl border border-blue-200 p-5 flex flex-col justify-between hover:shadow-xl transition-all duration-200">
      <div>
        <h2 className="text-xl font-bold text-blue-700 mb-2">
          {activity.name}
        </h2>
        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
        <p className="text-sm">
          <span className="font-semibold text-blue-900">📅 วันที่:</span>{" "}
          {activity.date}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-blue-900">📍 สถานที่:</span>{" "}
          {activity.location}
        </p>
        <p className="text-sm mt-1">
          <span className="font-semibold text-blue-900">👥 สมาชิก:</span>{" "}
          {activity.team_size} คน |{" "}
          <span className="font-semibold text-blue-900">ระดับ:</span>{" "}
          {activity.level}
        </p>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <span className="font-semibold">📞 ติดต่อ:</span>{" "}
          {activity.contact_name}
        </p>
        <p>
          {activity.contact_phone} | {activity.contact_email}
        </p>
      </div>
    </div>
  );
};

const ActivityCardList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/activities") // เปลี่ยน URL ตามที่ serve db.json ของคุณ
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch activities");
        return res.json();
      })
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading activities...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        📚 รายการกิจกรรมวันวิทยาศาสตร์และเทคโนโลยี
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;