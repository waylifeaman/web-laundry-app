import { db } from '../../firebaseConfig.js';

const attachOutlet = async (req, res, next) => {
  try {
    const outletDoc = await db.collection('outlets').doc(req.uid).get();

    if (!outletDoc.exists) {
      return res.status(403).json({ error: 'Outlet tidak ditemukan untuk akun ini' });
    }

    const outletData = outletDoc.data();

    if (!outletData.isActive) {
      return res.status(403).json({ error: 'Akun outlet ini nonaktif' });
    }

    if (outletData.subscription === 'trial') {
      const trialEnd = outletData.trial_end_date.toDate();
      if (new Date() > trialEnd) {
        return res.status(403).json({ error: 'Masa trial sudah habis, silakan upgrade' });
      }
    }

    req.outletId = req.uid;
    req.outletData = outletData;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default attachOutlet;  