import { admin } from '../../firebaseConfig.js';

const verifyAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token tidak ada' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.uid = decodedToken.uid;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token tidak valid atau kedaluwarsa' });
  }
};

export default verifyAuth;