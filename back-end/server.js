import express from 'express';
import { db } from './firebaseConfig.js';
import 'dotenv/config';
import authRoutes from './src/routes/authRoutes.js'; 
import reportRoutes from './src/routes/reportRoutes.js'
import cors from 'cors';
import orderRoutes from './src/routes/reportRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/reports', reportRoutes);
app.use('/orders', orderRoutes);
 
// Test route sederhana
app.get('/test-firebase', async (req, res) => {
  try {
    const snapshot = await db.collection('test').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ message: 'Berhasil konek ke Firebase!', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server jalan di http://localhost:3000'));