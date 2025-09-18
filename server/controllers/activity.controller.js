import Activity from "../models/activity.model.js";
import { Op } from "sequelize";

const activityControllers = {};

// ✅ CREATE
activityControllers.createActivity = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    } = req.body;

    const existing = await Activity.findOne({ where: { name } });
    if (existing) {
      return res
        .status(400)
        .send({ message: "Activity name is already existed" });
    }

    const newActivity = await Activity.create({
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    });

    res
      .status(201)
      .json({ message: "กิจกรรมถูกสร้างเรียบร้อยแล้ว", activity: newActivity });
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({
      message: "Something went wrong while creating the activity",
      error: error.message,
      errors: error.errors || null, // Sequelize จะเก็บ validation errors ตรงนี้
    });
  }
};

// ✅ GET ALL
activityControllers.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch activities" });
  }
};

// ✅ GET BY ID
activityControllers.getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch activity" });
  }
};

// ✅ UPDATE
activityControllers.updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    if (req.body.name && req.body.name !== activity.name) {
      const duplicate = await Activity.findOne({
        where: { name: req.body.name },
      });
      if (duplicate)
        return res
          .status(400)
          .send({ message: "Activity name is already existed" });
    }

    await activity.update(req.body);
    res.status(200).json({ message: "กิจกรรมถูกอัปเดตแล้ว", activity });
  } catch (error) {
    res.status(500).json({ message: "Failed to update activity" });
  }
};

// ✅ DELETE
activityControllers.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);
    if (!activity) return res.status(404).json({ error: "Activity not found" });

    await activity.destroy();
    res.status(200).json({ message: "กิจกรรมถูกลบเรียบร้อยแล้ว" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete activity" });
  }
};

// ✅ SEARCH
activityControllers.searchActivities = async (req, res) => {
  try {
    const { name, type, level, status } = req.query;
    const whereClause = {};

    if (name) whereClause.name = { [Op.iLike]: `%${name}%` };
    if (type) whereClause.type = type;
    if (level) whereClause.level = level;
    if (status) whereClause.status = status;

    const activities = await Activity.findAll({ where: whereClause });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while searching" });
  }
};

export default activityControllers;
