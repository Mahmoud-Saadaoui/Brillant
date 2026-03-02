import { Router } from 'express';
import { login, register, verifyAccount, forgotPassword, validateResetToken, resetPassword } from './auth.controller';

const authRouter = Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/:userId/verify/:token', verifyAccount)

// Password reset routes
authRouter.post('/password/forgot-password', forgotPassword)
authRouter.get('/password/reset-password/:userId/:token', validateResetToken)
authRouter.post('/password/reset-password/:userId/:token', resetPassword)

export default authRouter;