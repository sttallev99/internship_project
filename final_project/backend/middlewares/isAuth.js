import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    const token = req.cookies.access_token;
    
    if(!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, userData) => {
        if(err) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        req.userId = userData.userId;
        next();
    });

}
