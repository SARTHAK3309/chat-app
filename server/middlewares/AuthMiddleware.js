    import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

    export const authMiddleware = async(req, res, next) => {
        try {
            const bear_token = req.headers.authorisation;
            console.log(bear_token)
            if (!bear_token) {
                return res.status(401).json({
                    success: false,
                    message: "Authorization header missing"
                });
            }

            const token = bear_token.split(" ")[1];

            jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: "Authentication failed"
                    });
                }
               
                const user = await User.findOne({_id : decoded._id})
                req.user = user

                next();
            })
        
        } 
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    };
