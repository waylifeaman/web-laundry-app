import { getDailySummary } from "../../services/dailySummary";
import { useState, useEffect } from 'react';
import { COLORS } from "../../../public/css/color";

export const DailyReport = ()=>{
    const[summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user] = useState(()=>{
        const getName = localStorage.getItem('outlet');
        return JSON.parse(getName)
    })


    useEffect(()=>{
        const fetchSummary = async()=>{
            try{
                const data = await getDailySummary();
                setSummary(data);
            }catch(err){
                setError(err.message + " - gagal memuat data");
            }finally{
                setLoading(false)
            }
            
        };
        fetchSummary()
    },[])


    if(loading) return <p>Memuat data...</p>
    if (error) return <p style={{ color: COLORS.red.base }}>{error}</p>;

    return(
        <>
            <style>{`
                .container-daily{
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    }

                .card-daily{
                    background-color: ${COLORS.orange.light};
                    padding: 1rem;
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    color: white;
                }
            `}
                
            </style>
            <div className="container-daily">                            
                <h3>Ringkasan Hari ini</h3>                
                <div className="card-daily">
                    <div style={{ display:'flex', gap: "1rem" }}>
                        <p>Hallo {user.owner_name}</p>
                        <p> ({user.outlet_code})</p>
                        <p>{user.role}</p>
                    </div>
                    <p>RINGKASAN HARI INI</p>
                    <div style={{ backgroundColor: COLORS.orange.base, padding: '1rem', borderRadius: '15px', gap: '1rem', display: 'flex', flexDirection:'column' }}>
                        <p>Pendapatan Harian</p>
                        <h1>Rp {summary.totalPendapatan.toLocaleString('id-ID')}</h1>
                        <p>Total Order: {summary.totalOrder}</p>
                        <p>Kiloan: {summary.totalKiloan} Kg || Satuan: {summary.totalSatuan} Pcs</p>
                    </div>
                </div>
            </div>
        </>


    )
}