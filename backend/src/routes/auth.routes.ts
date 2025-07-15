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
            token: `Bearer ${token}`
         });
    } catch (error) {
        if (error instanceof Error) res.status(400).send({ error: error.message });
        else res.status(500).send();
    }
});

export default router;