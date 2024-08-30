import express from 'express';
import { validateUserToken } from '../middleware/authenticateToken.js';
import { getCurrentUser, updateUser } from '../controllers/UserController.js';
const router = express.Router()

router.use(validateUserToken)

router.route('/').get(getCurrentUser)
router.route('/:id').put(updateUser)

export default router