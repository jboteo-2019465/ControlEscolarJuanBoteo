import Student from '../models/studentModel.js';
import Course from '../models/courseModel.js';
import jwt from 'jsonwebtoken'

/* Controlador para asignar un curso a un estudiante
export const assignCourse = async (req, res) => {
    try {
        // Verificar si el estudiante ya está asignado al máximo de cursos permitidos
        const student = await Student.findById(req.user.id).populate('courses');
        if (student.courses.length >= 3) {
            return res.status(400).json({ message: 'Ya está asignado al máximo de cursos permitidos.' });
        }

        // Verificar si el curso ya está asignado al estudiante
        if (student.courses.some(course => course._id.toString() === req.params.courseId)) {
            return res.status(400).json({ message: 'Ya está asignado a este curso.' });
        }

        // Verificar si el curso existe
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: 'Curso no encontrado.' });
        }

        // Asignar el curso al estudiante
        student.courses.push(course);
        await student.save();

        res.status(200).json({ message: 'Curso asignado exitosamente.', course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al asignar el curso.' });
    }
};
*/


export const assignCourse = async (req, res) => {
    try {
        let token = req.headers.authorization

        let decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        let id = decodeToken.id

        //Verificar si el curso existe
        const course = await Course.findOne({ _id: req.params.courseId})
        if (!course) {
            return res.status(404).send({ message: 'Curso no encontrado' })
        }
        //Asignacion
        course.students = id;

        //Guardar cambios
        await course.save();

        res.status(200).send({ message: `Asignado a ${course} existosamente` });

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Error al asignar al curso' })
    }
}

// Controlador para ver todos los cursos disponibles para un estudiante
export const viewCourses = async (req, res) => {
    try {
        // Obtener todos los cursos disponibles
        const courses = await Course.find();

        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los cursos.' });
    }
};

// estudiante edite su perfil
export const editProfile = async (req, res) => {
    try {
        // Buscar al estudiante por su ID
        const student = await Student.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ message: 'Estudiante no encontrado.' });
        }

        // Actualizar los datos del estudiante
        student.username = req.body.username || student.username;
        student.email = req.body.email || student.email;

        // Guardar los cambios en la base de datos
        await student.save();

        res.status(200).json({ message: 'Perfil actualizado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el perfil.' });
    }
};

// estudiante elimine su perfil
export const deleteProfile = async (req, res) => {
    try {
        // Eliminar al estudiante de la base de datos
        await Student.findByIdAndDelete(req.user.id);

        res.status(200).json({ message: 'Perfil eliminado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el perfil.' });
    }
};
