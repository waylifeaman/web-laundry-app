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

export const getOrderById = async(req, res)=>{
  try{
    const { id } = req.params;
      // Pastikan req.outletId ada dari middleware attachOutlet
        if (!req.outletId) {
      return res.status(400).json({ message: 'Outlet ID tidak ditemukan pada request' });
    }


    const docRef = await db
      .collection('outlets')
      .doc(req.outletId)
      .collection('orders')
      .doc(id)
      .get();

      if(!docRef.exists){
        return res.status(404).json({message: "Order tidak ditemukan"});
      }
      const orderData = {
        id: docRef.id,
        ...docRef.data()
      }
      return res.status(200).json(orderData);
  }catch(err){
    console.error(err)
    return res.status(500).json({message: "Ada masalah di server", error: err.message})
  }
}
