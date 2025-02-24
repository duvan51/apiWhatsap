import express from 'express';
import { getAllUsers,
        createUser,

        startSession,
        getQr,
        sendWhatsap,


} from '../controllers/userController.js';


const router = express.Router();

router.get('/', getAllUsers) //ruta solo produccion
router.post('/', createUser )



router.post('/startSession', startSession)
router.get('/get-qr/:id', getQr)
router.post('/send-whatsapp', sendWhatsap)




export default router;