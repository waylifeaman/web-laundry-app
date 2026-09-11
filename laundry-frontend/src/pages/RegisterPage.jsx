import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import { register } from "../services/AuthService";
import { COLORS } from "../../public/css/color";

const RegisterPage = ()=>{
    const [formData, setFormData] = useState({
        name: '',
        ownerName: '',
        email: '',
        password: '',
        phone:'',
        address:'',
    })

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const validateForm = () => {
        if (formData.password.length < 6) {
            setError('Password minimal 6 karakter');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Format email tidak valid');
            return false;
        }

        const phoneRegex = /^[0-9]{10,13}$/;
        if (!phoneRegex.test(formData.phone)) {
            setError('Nomor HP harus 10-13 digit angka');
            return false;
        }

        return true;
    };

    const handleChange = (field) =>(e)=>{
        setFormData((prev)=>({...prev, [field] : e.target.value}));
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError('');
        if (!validateForm()) return;

        setLoading(true);

        try{
            await register(formData);
            navigate('/login', { state: { registered: true } });
        }catch(err){
            setError(err.respons?.data?.error || 'registrasi gagal');
        }finally{
            setLoading(false);
        }
    } 

    return(
    <div className="container" style={{  display: 'flex', alignContent: 'center', justifyContent: 'center', padding: '3rem' }}>
            <div style={{backgroundColor: COLORS.gray[100], width: '50%', borderRadius: '15px', display:'flex', flexDirection: 'column', alignItems:'center'}}>
            <img src="../../public/assets/logo2.png" alt="" width='30%'/>
            <h2 style={{ marginBottom: '24px' }}>Daftar Outlet Laundry</h2>

        <form onSubmit={handleSubmit} width='100%' style={{ width: '80%'}}>
            <AuthInput
            label="Nama Outlet"
            type="text"
            value={formData.name}
            onChange={handleChange('name')}
            placeholder="Laundry Bersih Jaya"
            />
            <AuthInput
            label="Nama Pemilik"
            type="text"
            value={formData.owner_name}
            onChange={handleChange('owner_name')}
            placeholder="Budi"
            />
            <AuthInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="email@gmail.com"
            />
            <AuthInput
            label="No. HP"
            type="text"
            value={formData.phone}
            onChange={handleChange('phone')}
            placeholder="081234567890"
            />
            <AuthInput
            label="Alamat"
            type="text"
            value={formData.address}
            onChange={handleChange('address')}
            placeholder="Jl. Sesetan No. 10"
            />
            <AuthInput
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            placeholder="Minimal 6 karakter"
            />

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
            {loading ? 'Memproses...' : 'Daftar'}
            </button>
        </form>

        <p style={{ marginTop: '16px', fontSize: '14px', textAlign: 'center' }}>
            Sudah punya akun? <Link to="/login">Login</Link>
        </p>
        </div>
    </div>
    )
}

export default RegisterPage;