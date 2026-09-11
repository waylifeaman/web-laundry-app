import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthInput from '../../components/auth/AuthInput';
import { forgotPassword } from '../../services/AuthService';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = await forgotPassword(email);
      setMessage(data.message);
    } catch (err) {
      setMessage(err, 'Terjadi kesalahan, coba lagi nanti');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '360px', margin: '80px auto', padding: '24px' }}>
      <h2 style={{ marginBottom: '8px' }}>Lupa Password</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        Masukkan email outlet kamu, kami akan kirimkan link buat reset password.
      </p>

      <form onSubmit={handleSubmit}>
        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@outlet.com"
        />

        {message && (
          <p style={{ fontSize: '14px', color: 'green', marginBottom: '12px' }}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            background: '#152C4A',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Mengirim...' : 'Kirim Link Reset'}
        </button>
      </form>

      <p style={{ marginTop: '16px', fontSize: '14px', textAlign: 'center' }}>
        <Link to="/login">Kembali ke Login</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;