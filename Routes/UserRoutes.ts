import express from 'express';

const { createUser, loginUser } = require("../Controllers/UserControllers")
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

router.route('/register').post(createUser);
router.post('/login', loginUser);


router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});


module.exports = router;


