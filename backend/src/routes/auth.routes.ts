import { Router } from 'express';
import { AccountService } from '../services';
import { AdminCredentials, Credentials, JwtToken } from '../types';
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET!;

router.post('/register', async (req, res) => {
    const credentials: Credentials = req.body;
    try {
        const newAccount = await AccountService.add(credentials.username, credentials.password, false);
        console.log(`Account ${credentials.username} registered successfully`);
        res.status(201).json({
            message: "Account registered successfully",
            id: newAccount.id,
            username: newAccount.username,
          });
    } catch (error) {
        if (error instanceof Error) res.status(400).send({ error: error.message });
        else res.status(500).send();
    }   
});

router.post('/register-admin', async (req, res) => {
    const credentials: AdminCredentials = req.body;
    if (credentials.adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    try {
        const newAccount = await AccountService.add(credentials.username, credentials.password, true);
        console.log(`Admin account ${credentials.username} registered successfully`);
        res.status(201).json({
            message: "Admin account registered successfully",
            id: newAccount.id,
            username: newAccount.username,
        });
    } catch (error) {
        if (error instanceof Error) res.status(400).send({ error: error.message });
        else res.status(500).send();
    }
})

router.post('/login', async (req, res) => {
    const credentials: Credentials = req.body;
    try {
        const account = await AccountService.authenticate(credentials);
        console.log(`Account ${credentials.username} logged in successfully`);
        const tokenPayload: JwtToken = {
            accountId: account.id,
            username: account.username,
            isAdmin: account.is_admin
        };
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ 
            message: 'Login successful',
            id: account.id,
            username: account.username,
            token: `Bearer ${token}`,
            isAdmin: account.is_admin
         });
    } catch (error) {
        if (error instanceof Error) res.status(400).send({ error: error.message });
        else res.status(500).send();
    }
});

// This is for checking that the user corresponding to the token still exists and role is up to date
// this if used for other app which uses the same authentication
router.post('/verify-token', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    try{
        console.log('My JWT token is: ', JWT_SECRET);
        const decodedToken = jwt.verify(token!, JWT_SECRET) as JwtToken;
        const account = await AccountService.getById(decodedToken.accountId);
        if (!account) return res.status(401).json({ error: 'Unauthorized', message: 'Account not found' });
        if (account.is_admin !== decodedToken.isAdmin) {
            return res.status(403).json({ error: 'Forbidden', message: 'Account role is not up to date' });
        }
        res.status(200).json({ message: 'Token verified', decodedToken});
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized', message: 'Token is invalid or expired' });
    }
});

export default router;