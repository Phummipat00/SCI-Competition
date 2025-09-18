# รายงานการแก้ไขปัญหา ReferenceError: verifyEmail is not defined

## วันที่ดำเนินการ
18 กันยายน 2025

## รายละเอียดปัญหา
เกิดข้อผิดพลาด ReferenceError: verifyEmail is not defined ในไฟล์ `server/controllers/auth.controller.js` เนื่องจากมีการเรียกใช้ verifyEmail ในการ export แต่ verifyEmail ถูกประกาศอยู่ภายในฟังก์ชัน signUp ทำให้ไม่สามารถเข้าถึงได้จากภายนอก

## ขั้นตอนการแก้ไข
1. **ตรวจสอบ error**
   - อ่านข้อความ error และระบุไฟล์/บรรทัดที่เกิดปัญหา
2. **ค้นหา verifyEmail ในไฟล์**
   - ใช้การค้นหาเพื่อดูว่าฟังก์ชัน verifyEmail ถูกประกาศที่ใด
3. **ย้าย verifyEmail ออกมาไว้ข้างนอกฟังก์ชัน signUp**
   - ตัดโค้ด verifyEmail ออกมาไว้ในระดับบนสุดของไฟล์ เพื่อให้สามารถ export ได้
4. **แก้ไขการ export**
   - ตรวจสอบว่า verifyEmail ถูก export ใน object `authController` อย่างถูกต้อง
5. **ตรวจสอบ error หลังแก้ไข**
   - ทดสอบการทำงานใหม่เพื่อดูว่า error หายไปหรือไม่

## ตัวอย่างโค้ดหลังแก้ไข
```javascript
// Email verification handler
const verifyEmail = async (req, res) => {
  const { token } = req.params;
  if (!token) {
    return res.status(400).send({ message: "Invalid token" });
  }
  try {
    const verification = await db.VerificationToken.findOne({
      where: { token: token },
    });
    if (!verification) {
      return res.status(400).send({ message: "Invalid token" });
    }
    if (verification.expiredAt < new Date()) {
      await db.VerificationToken.destroy();
      return res.status(400).send({ message: "Token is expired" });
    }
    const user = await User.findByPk(verification.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    await user.update({ isVerified: true });
    await verification.destroy();
    const htmlPath = path.join(process.cwd(), "views", "verified.html");
    res.sendFile(htmlPath);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while verifying email",
    });
  }
};

const authController = {
  signUp,
  verifyEmail,
  // signIn,
};55555

export default authController;
```

## ผลลัพธ์
- สามารถ export และเรียกใช้ verifyEmail ได้อย่างถูกต้อง
- ไม่มี error ในไฟล์หลังแก้ไข

## หมายเหตุ
การแก้ไขนี้ช่วยให้โค้ดมีโครงสร้างที่ถูกต้องและสามารถนำฟังก์ชัน verifyEmail ไปใช้งานใน router หรือส่วนอื่น ๆ ได้ตามต้องการ
