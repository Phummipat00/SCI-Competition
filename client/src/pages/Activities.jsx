import React, { useEffect, useState } from "react";
import ActivitiesService from "../services/activity.service";
import ActivityCard from "../components/ActivityCard";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ActivitiesService.getAllActivities();
        if (response.status === 200) {
          setActivities(response.data);
        }
      } catch (error) {
        console.log("fetching error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {activities.length === 0 && <p>ยังไม่มีกิจกรรม</p>}
      {activities.length > 0 &&
        activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
    </div>
  );
};

export default Activities;