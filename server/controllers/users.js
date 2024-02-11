import { db } from "../db.js";
import multer from "multer";
import * as path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const getUsers = (req, res) => {
    const q = "SELECT * FROM user";

    db.query(q, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};

export const getUserById = (req, res) => {
    const userId = req.params.userId;

    const q = "SELECT * FROM user WHERE user_id=?";

    db.query(q, [userId], (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    });
};

export const getUsersThisYear = (req, res) => {
    const q = `
    SELECT *
    FROM user
    WHERE YEAR(user_date_joined) = YEAR(CURRENT_DATE)
  `;
    db.query(q, (err, data) => {
        if (err) {
            res.json(err);
            console.log(err);
        } else {
            res.json(data);
        }
    });
};

export const addUser = (req, res) => {
    const q1 = "SELECT * FROM user WHERE user_email=? ";

    const user_id = uuidv4();

    const { user_full_name, user_email, user_password, terms_checkbox } =
        req.body;
    db.query(q1, [user_email], (err, data) => {
        if (err) {
            return res
                .status(401)
                .send({ message: "Connection error try again." });
        } else {
            if (data.length > 0) {
                return res.status(409).send({
                    message:
                        "An account already exist with this email. Please use a new email or login.",
                });
            } else {
                const randomNum = Math.floor(Math.random() * 1000000);
                const randomCode = randomNum.toString().padStart(6, "0");

                try {
                    let info = transporter.sendMail({
                        from: '"Online learning site" <info@onlinelearning.com>',
                        to: `${user_email}`,
                        subject: "Verification Code",
                        text: `Hello new user!\n We would like to verify if this email belongs to you. \n
                        Your Verification code is ${randomCode},\n
                        If this was not you simply ignore this email. Have a great day!`,
                        html: "",
                    });
                } catch (err) {
                    return res.status(401).send({
                        message:
                            "Error! Cannot connect to recipient email. Please try again.",
                    });
                }

                const currentDate = new Date();

                const OTPsalt = bcrypt.genSaltSync(10);
                const user_token = bcrypt.hashSync(randomCode, OTPsalt);

                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(user_password, salt);

                const q =
                    "INSERT INTO user (user_id, user_full_name, user_email, user_password, user_date_joined, user_token) VALUES (?,?,?,?,?,?)";

                db.query(
                    q,
                    [
                        user_id,
                        user_full_name,
                        user_email,
                        hash,
                        currentDate,
                        user_token,
                    ],
                    (err, data) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                message:
                                    "Oops! Server connection error. Please try again.",
                            });
                        } else {
                            res.status(200).json({
                                message:
                                    "You have Registered Successfully! Please Verify your account.",
                            });
                        }
                    }
                );
            }
        }
    });
};

export const verifyUser = (req, res) => {
    const q1 = "SELECT * FROM user WHERE user_email=? ";

    const user_id = uuidv4();

    const { user_email, OTP } = req.body;
    db.query(q1, [user_email], (err, data) => {
        if (err) {
            return res
                .status(401)
                .send({ message: "Connection error try again." });
        } else {
            if (data.length > 0) {
                const strOTP = OTP.toString();
                const isMatch = bcrypt.compareSync(strOTP, data[0].user_token);

                if (!isMatch) {
                    return res.status(404).send({
                        message: "You have entered the wrong code. Try again !",
                    });
                } else {
                    var token = null;
                    try {
                        token = jwt.sign(
                            {
                                username: data[0].user_full_name,
                                user_id: data[0].user_id,
                            },
                            process.env.JWT_SECRET,
                            { expiresIn: "1d" }
                        );
                    } catch (err) {
                        console.log(err);
                        return res.status(500).json({
                            message:
                                "Failed to create user session. Please try again.",
                        });
                    }

                    res.cookie("UserToken123", token, {
                        httpOnly: true,
                    });
                    res.status(200).json({
                        message:
                            "You have successfully verified your account! Welcome to our platform.",
                        username: data[0].user_full_name,
                        user_id: data[0].user_id,
                    });

                    const strVerified = "Verified";
                    const salt = bcrypt.genSaltSync(10);
                    const new_token = bcrypt.hashSync(strVerified, salt);
                    const q =
                        "UPDATE user SET user_token=?  WHERE user_email=?";

                    db.query(q, [new_token, user_email], (err, data) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                message:
                                    "Failed to update token in database. Please try again.",
                            });
                        } else {
                        }
                    });
                }
            } else {
                return res.status(404).send({
                    message: "Error! No such account found.",
                });
            }
        }
    });
};

export const updateUser = (req, res) => {
    try {
        let upload = multer({ storage: storage }).single("User_image");

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }

            const uploadedFile = req.file
                ? { fileName: req.file.filename }
                : { fileName: null };

            console.log("fname", uploadedFile.fileName);

            if (req.body.old_image !== null) {
                const filename = req.body.old_image;
                const directoryPath = "../../client/src/images/profiles/";

                const filePath = path.join(__dirname, directoryPath, filename);

                unlink(filePath)
                    .then(() => {
                        console.log("File deleted successfully");
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }

            const q =
                "UPDATE team SET User_name=?, User_position=? ,User_image=? WHERE User_id=?";

            db.query(
                q,
                [
                    req.body.User_name,
                    req.body.User_position,
                    uploadedFile.fileName,
                    req.body.User_id,
                ],
                (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            error: "Failed to update value in database. Please try again.",
                        });
                    } else {
                        res.json(data);
                    }
                }
            );
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteUser = (req, res) => {
    const q = " DELETE FROM user WHERE user_id=?";
    db.query(q, req.params.id, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};
