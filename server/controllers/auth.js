import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = (req, res) => {
    const { user_email, user_password, signed_checkbox } = req.body;

    const q = "SELECT * FROM user WHERE user_email=?";
    db.query(q, [user_email], (err, result) => {
        if (err) {
            return res
                .status(401)
                .json({ message: "Server Error. Please try again" });
        } else {
            const strVerified = "Verified";
            const isVerified = bcrypt.compareSync(
                strVerified,
                result[0].user_token
            );

            if (!isVerified) {
                return res.status(403).json({
                    message:
                        "Your account is not verified! Please Verify using the code from your email.",
                });
            } else {
                try {
                    const isMatch = bcrypt.compareSync(
                        user_password,
                        result[0].user_password
                    );
                    if (!isMatch) {
                        return res
                            .status(401)
                            .json({ message: "Invalid username or password" });
                    }
                } catch (err) {
                    return res
                        .status(401)
                        .json({ message: "Invalid username or password" });
                }

                const token = jwt.sign(
                    {
                        username: result[0].user_full_name,
                        user_id: result[0].user_id,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );
                res.cookie("UserToken123", token, { httpOnly: true });
                res.status(200).json({
                    message: `Login successful. Redirecting...`,
                    username: result[0].user_full_name,
                    user_id: result[0].user_id,
                    user_email: result[0].user_email,
                });
            }
        }
    });
};

export const logout = (req, res) => {
    res.clearCookie("UserToken123");
    res.status(200).send({ message: "Logout successful" });
};

export const checkLogin = (req, res) => {
    const token = req.cookies.UserToken123;
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return res.status(200).send({
            message: "Welcome",
            user: req.user,
            exp: req.exp,
            iat: req.iat,
        });
    } catch (e) {
        return res.status(401).send({ message: "Unauthorized" });
    }
};

export const checkPassword = (req, res) => {
    // console.log(req.body, "Check Password request");
    const { user_password, user_id } = req.body;

    const q = "SELECT * FROM user WHERE user_id =?";
    db.query(q, [user_id], (err, result) => {
        if (err) {
            return res
                .status(401)
                .json({ message: "Server Error. Please try again" });
        } else {
            try {
                const isMatch = bcrypt.compareSync(
                    user_password,
                    result[0].user_password
                );
                if (!isMatch) {
                    return res
                        .status(401)
                        .json({ message: "Invalid  password" });
                } else {
                    return res
                        .status(200)
                        .json({ message: "Password Verified." });
                }
            } catch (err) {
                return res.status(401).json({ message: "Invalid password" });
            }

            // const token = jwt.sign(
            //     {
            //         username: result[0].user_full_name,
            //         user_id: result[0].user_id,
            //     },
            //     process.env.JWT_SECRET,
            //     { expiresIn: "1h" }
            // );
            // res.cookie("UserToken123", token, { httpOnly: true });
            // res.status(200).json({
            //     message: `Login successful. Redirecting...`,
            //     username: result[0].user_full_name,
            //     user_id: result[0].user_id,
            // });
        }
    });
};
export const changeEmail = (req, res) => {
    const { user_email, user_new_email } = req.body;

    const checkEmailQuery = "SELECT * FROM user WHERE user_email=?";
    db.query(checkEmailQuery, [user_email], (err, result) => {
        if (err) {
            return res
                .status(500)
                .json({ message: "Server Error. Please try again" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Current email not found" });
        }

        // Check if the new email already exists in the database
        const checkNewEmailQuery = "SELECT * FROM user WHERE user_email=?";
        db.query(
            checkNewEmailQuery,
            [user_new_email],
            (newEmailErr, newEmailResult) => {
                if (newEmailErr) {
                    return res
                        .status(500)
                        .json({ message: "Server Error. Please try again" });
                }

                if (newEmailResult.length > 0) {
                    return res
                        .status(400)
                        .json({
                            message:
                                "New e-mail already in use. Provide another e-mail",
                        });
                }

                const updateEmailQuery =
                    "UPDATE user SET user_email=? WHERE user_email=?";
                db.query(
                    updateEmailQuery,
                    [user_new_email, user_email],
                    (updateErr) => {
                        if (updateErr) {
                            return res.status(500).json({
                                message: "Server Error. Please try again",
                            });
                        }

                        const token = jwt.sign(
                            {
                                username: result[0].user_full_name,
                                user_id: result[0].user_id,
                                user_email: user_new_email,
                            },
                            process.env.JWT_SECRET,
                            { expiresIn: "1h" }
                        );

                        res.cookie("UserToken123", token, { httpOnly: true });

                        res.status(200).json({
                            message: "Email changed successfully.",
                            username: result[0].user_full_name,
                            user_id: result[0].user_id,
                            user_email: user_new_email,
                        });
                    }
                );
            }
        );
    });
};

export const changePassword = (req, res) => {
    const { user_id, new_password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(new_password, salt);

    // const saltRounds = 10;
    // bcrypt.hash(user_password, saltRounds, (hashErr, hashedPassword) => {
    //     if (hashErr) {
    //         return res
    //             .status(500)
    //             .json({ message: "Hash Server Error. Please try again" });
    //     }
    // });

    const updatePasswordQuery =
        "UPDATE user SET user_password=? WHERE user_id=?";
    db.query(updatePasswordQuery, [hashedPassword, user_id], (updateErr) => {
        if (updateErr) {
            return res.status(500).json({
                message: "Unable to update password! Please try again.",
            });
        }

        // Return a success message
        res.status(200).json({
            message: "Password updated successfully!",
        });
    });
};

/////////////////////adim Login adim so Dont Touch/////////////////////
export const loginAdmin = (req, res) => {
    const { username: admin_username, password: admin_password } = req.body;

    const q = "SELECT * FROM admin WHERE admin_username=?";
    db.query(q, [admin_username], (err, result) => {
        if (err) {
            return res
                .status(401)
                .json({ message: "Server Error. Please try again" });
        } else {
            try {
                var hash = bcrypt.hashSync("1046031413", 8);
                console.log(hash);
                // const isMatch = admin_password === result[0].admin_password;

                const isMatch = bcrypt.compareSync(
                    admin_password,
                    result[0].admin_password
                );
                if (!isMatch) {
                    return res
                        .status(401)
                        .json({ message: "Invalid username or password" });
                }
            } catch (err) {
                return res
                    .status(401)
                    .json({ message: "Invalid username or password" });
            }

            const token = jwt.sign(
                {
                    username: result[0].admin_username,
                    user_id: result[0].admin_id,
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.cookie("AdminToken123", token, {
                maxAge: 3600000,
                httpOnly: true,
            });
            res.status(200).json({
                message: `Login successful. Redirecting...`,
                username: result[0].admin_username,
                admin_id: result[0].admin_id,
            });
        }
    });
};

export const checkAdminLogin = (req, res) => {
    const token = req.cookies.AdminToken123;
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return res.status(200).send({
            message: "Welcome ",
            user: req.user,
            exp: req.exp,
            iat: req.iat,
        });
    } catch (e) {
        return res.status(401).send({ message: "Unauthorized" });
    }
};
export const logoutAdmin = (req, res) => {
    res.clearCookie("AdminToken123");
    res.status(200).send({ message: "Logout successful" });
};
