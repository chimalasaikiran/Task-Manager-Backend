import express from 'express';
import {body} from 'express-validator';
import {signup, login} from '../controllers/authControllers.js'

const router = express.Router();

// Sample route for user registration
router.post('/signup',[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('valid email is required'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
],
  signup
);

// Sample route for user login
router.post('/login',[
    body('email').isEmail().withMessage('valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
], login
);

export default router;