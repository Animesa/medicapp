import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(403).json({ error: 'Un token es requerido para la autenticación' });
    }

    // El formato esperado es "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Token inválido o no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardamos los datos del usuario en req.user para usarlos en los controladores
    } catch (err) {
        return res.status(401).json({ error: 'Token expirado o inválido' });
    }
    
    return next();
};
