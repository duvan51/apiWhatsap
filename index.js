import express from 'express';
import cors from 'cors';
import UserRoutes from './routes/userRoutes.js';


const app = express();
const PORT = 4000;


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/users', UserRoutes)


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})