import { DataTypes } from "sequelize";
import sequelize from "./db.js";
import User from "./user.model.js";

const VerificationToken = sequelize.define("verificationTokens", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    reference: {
      model: User,
      key: "id",
    },
  },
  expiredAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
export default VerificationToken;
