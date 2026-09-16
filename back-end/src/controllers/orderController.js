import { db } from '../../firebaseConfig.js';

export const getOrders = async (req, res) => {
  try {
    const snapshot = await db
      .collection('outlets')
      .doc(req.outletId)
      .collection('orders')
      .orderBy('created_at', 'desc')
      .get();

    const orders = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString() || null,
      };
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};