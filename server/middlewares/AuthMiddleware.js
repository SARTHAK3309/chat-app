    import jwt from "jsonwebtoken";

    export const authMiddleware = (req, res, next) => {
        try {
            const bear_token = req.headers.authorisation;

            if (!bear_token) {
                return res.status(401).json({
                    success: false,
                    message: "Authorization header missing"
                });
            }

            const token = bear_token.split(" ")[1];

            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: "Authentication failed"
                    });
                }
                
                req.user = decoded

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
