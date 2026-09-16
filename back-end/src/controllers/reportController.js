import { db } from "../../firebaseConfig.js";

export const getDailySummary = async (req, res) => {
  try {
    const { date } = req.query;

    const targetDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const snapshot = await db
      .collection('outlets')
      .doc(req.outletId)
      .collection('orders')
      .where('created_at', '>=', startOfDay)
      .where('created_at', '<=', endOfDay)
      .get();

    let totalPendapatan = 0;
    let totalOrder = 0;
    let totalKiloan = 0;
    let totalSatuan = 0;

    snapshot.forEach((doc) => {
      const order = doc.data();
      totalOrder += 1;
      totalPendapatan += order.total_price || 0;

      (order.items || []).forEach((item) => {
        if (item.product_type === 'Kiloan') {
          totalKiloan += item.qty;
        } else if (item.product_type === 'Satuan') {
          totalSatuan += item.qty;
        }
      });
    });

    res.json({
      date: startOfDay.toISOString().split('T')[0],   // sekalian aku benerin bug toDateString yang dulu
      totalPendapatan,
      totalOrder,
      totalKiloan,
      totalSatuan,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};