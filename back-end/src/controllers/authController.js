import { admin, db } from '../../firebaseConfig.js';
import axios from 'axios';

// REGISTRASI - buat akun outlet baru
export const register = async (req, res) => {
  try {
    const { email, password, name, owner_name, phone, address, outlet_code } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, dan nama outlet wajib diisi' });
    }
       // Tambahan validasi
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password minimal 6 karakter' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Format email tidak valid' });
    }

    // 1. Buat user di Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // 2. Buat dokumen outlet di Firestore, document ID = uid
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7); // trial 7 hari

    await db.collection('outlets').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      name,
      owner_name: owner_name || '',
      phone: phone || '',
      address: address || '',
      outlet_code: outlet_code || '',
      auth_method: 'email',
      subscription: 'trial',
      isActive: true,
      trial_end_date: trialEndDate,
      created_at: new Date(),
    });

    res.status(201).json({
      message: 'Registrasi berhasil',
      uid: userRecord.uid,
    });
  } catch (error) {
    // Handle error umum dari Firebase Auth
    if (error.code === 'auth/email-already-exists') {
      return res.status(409).json({ error: 'Email sudah terdaftar' });
    }
    res.status(500).json({ error: error.message });
  }
};

// LOGIN - verifikasi email & password
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi' });
    }

    // Panggil Firebase Auth REST API buat verifikasi password
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const { idToken, refreshToken, localId } = response.data;

    // Ambil data outlet berdasarkan uid (localId)
    const outletDoc = await db.collection('outlets').doc(localId).get();

    if (!outletDoc.exists) {
      return res.status(404).json({ error: 'Data outlet tidak ditemukan' });
    }

    res.json({
      message: 'Login berhasil',
      idToken,
      refreshToken,
      outlet: outletDoc.data(),
    });
  } catch (error) {
    // Error dari Firebase REST API (password salah, email gak ada, dll)
    const message = error.response?.data?.error?.message;

    if (message === 'INVALID_LOGIN_CREDENTIALS' || message === 'EMAIL_NOT_FOUND' || message === 'INVALID_PASSWORD') {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    res.status(500).json({ error: error.message });
  }
};


//untuk forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email wajib diisi' });
    }

    await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.FIREBASE_API_KEY}`,
      {
        requestType: 'PASSWORD_RESET',
        email,
      }
    );

    // Selalu balas sukses, walau email tidak terdaftar (lihat penjelasan di bawah)
    res.json({ message: 'Jika email terdaftar, link reset password sudah dikirim' });
  } catch (error) {
    const message = error.response?.data?.error?.message;

    if (message === 'EMAIL_NOT_FOUND') {
      // Tetap balas sukses, JANGAN kasih tau email tidak ditemukan
      return res.json({ message: 'Jika email terdaftar, link reset password sudah dikirim' });
    }

    res.status(500).json({ error: 'Gagal mengirim email reset password' });
  }
};