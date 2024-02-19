import jwt from 'jsonwebtoken';

// Middleware para validar el token JWT
export const validateJwt = (req, res, next) => {
    // Obtener el token de los headers de la solicitud
    const token = req.headers.authorization;

    // Obtener la ruta actual
    const currentRoute = req.path;

    // Lista de rutas que no requieren autenticación
    const publicRoutes = ['/api/auth/login'];

    // Verificar si la ruta actual está en la lista de rutas públicas
    if (publicRoutes.includes(currentRoute)) {
        // Pasar al siguiente middleware
        return next();
    }

    // Verificar si el token existe
    if (!token) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado.' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Añadir el objeto decodificado al objeto de solicitud para uso posterior
        req.user = decoded;
        // Pasar al siguiente middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token de autenticación inválido.' });
    }
};

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
};



