import express from "express";
import {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    getUsersThisYear,
    getUserById,
    verifyUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/getUsers", getUsers);
router.get("/getUsersThisYear", getUsersThisYear);
router.put("/updateUser", updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.post("/addUser", addUser);
router.post("/verifyUser", verifyUser);
router.get("/getUserById/:userId", getUserById);

export default router;
