import { validationResult, check } from 'express-validator';
import { Request } from 'express-validator/src/base';

const validator = async (req:Request) => {
    await check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 5 })
    .withMessage('Username should be at least 5 characters long')
    .run(req);

    await check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password should be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password should contain at least one digit')
    .matches(/[a-z]/)
    .withMessage('Password should contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password should contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password should contain at least one special character')
    .run(req);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return errors.array()
    }
    return false
}

export default validator