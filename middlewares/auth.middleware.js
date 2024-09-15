import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {

    const token = req.cookies.jwt_token;

    console.log(token)

    jwt.verify(token, 'xyz123', (err, decode) => {
        
        if (err) {

            return res.status(401).json({
                message: 'You Are Not Authenticated'
            });

        } else {

            req.userId = decode.id
            next();

        }

    });

};

export const isAdmin = (req, res, next) => {

    if (req.user.role !== 'admin') {

        return res.status(403).json({ message: 'Access  Denied. Admins Only.' });

    }

    next();
    
};
