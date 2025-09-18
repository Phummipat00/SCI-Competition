// models/Activity.js
import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Activity = sequelize.define("activity", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  team_size: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reg_open: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  reg_close: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  contact_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact_phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact_email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  status: {
    type: DataTypes.ENUM("draft", "open", "closed", "in_progress", "completed"),
    allowNull: true,
    defaultValue: "draft",
  },
});

Activity.sync({ force: false })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.error("Error creating table:", error);
  });

export default Activity;
