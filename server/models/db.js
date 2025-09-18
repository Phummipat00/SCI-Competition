import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.DIALECT, //ประเภทฐานข้อมูล
  logging: false, //ปิดการแสดงผล log คำสั่ง SQL ใน console เพื่อไม่ให้ข้อมูลเยอะเกินไป
  dialectOptions: {
    ssl: false,
  },
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been etablished successfully");
  } catch (error) {
    console.log("Unable to connect to the database", error);
  }
};

testConnection();
export default sequelize;
