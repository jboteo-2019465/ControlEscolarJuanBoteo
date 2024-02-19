import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from '../routes/authRoutes.js';
import teacherRoutes from '../routes/teacherRoutes.js';
import studentRoutes from '../routes/studentRoutes.js';
import { connectDB } from './mongoDB.js';
import { validateJwt, errorHandler } from '../middlewares/authMiddleware.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos MongoDB
connectDB();

// Configurar middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Definir rutas
app.use('/api/auth', authRoutes);
app.use(teacherRoutes);
app.use(studentRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('Welcome to School Management System');
});

app.use(validateJwt);

app.use(errorHandler);


// Exportar la aplicación Express configurada
export default app;

