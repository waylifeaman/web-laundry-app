import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../../components/auth/AuthInput';
import { login } from '../../services/AuthService';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {COLORS} from '../../../public/css/color'

const LoginPage = () => {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
        const data = await login(email, password);

        // Simpan token & data outlet di localStorage
        localStorage.setItem('idToken', data.idToken);
        localStorage.setItem('outlet', JSON.stringify(data.outlet));

        navigate('/home');
        } catch (err) {
        setError(err.response?.data?.error || 'Login gagal, coba lagi');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="container" style={{  display: 'flex', alignContent: 'center', justifyContent: 'center', padding: '5rem' }}>
            <div style={{backgroundColor: COLORS.gray[100], width: '50%', borderRadius: '15px', display:'flex', flexDirection: 'column', alignItems:'center'}}>
                <img src="../../public/assets/logo2.png" alt="" width='30%'/>
                <h2 style={{ marginBottom: '24px' }}>Login Owner</h2>
                    {location.state?.registered && (
                        <p style={{ color: 'green', fontSize: '14px', marginBottom: '16px' }}>
                        Registrasi berhasil! Silakan login.
                        </p>
                    )}
                <form onSubmit={handleSubmit} width='100%' style={{ width: '80%'}}>
                    <AuthInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@gmail.com"
                    />
                    <AuthInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    />
                    <p style={{ fontSize: '14px', textAlign: 'right', marginBottom: '16px' }}>
                        <Link to="/forgot-password">Lupa Password?</Link>
                    </p>
                    {error && (
                    <p style={{ color: 'red', fontSize: '14px', marginBottom: '12px' }}>
                        {error}
                    </p>
                    )}

                    <button
                    type="submit"
                    disabled={loading}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        background: isHovered ? COLORS.yellow.dark : COLORS.yellow.base,            
                        color: 'white',
                        border: 'none',
                        borderRadius: '15px',
                        cursor: 'pointer',
                    }}
                    >
                    {loading ? 'Memproses...' : 'Login'}
                    </button>
                    
                    <p>belum punya outlet? <Link to='/register'>Daftar disini</Link></p>
                </form>
                </div>
        </div>
    
    );
};

export default LoginPage;