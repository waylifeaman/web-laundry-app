import { getDailySummary } from "../../services/dailySummary";
import { useState, useEffect, use } from 'react';
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
                setError({error: err.message + "gagal memuatdata"})
            }finally{
                setLoading(false)
            }
            
        };
        (fetchSummary())
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
                    background-color: var(--color-orange-light);
                    padding: 1rem;
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem
                }
            `}
                
            </style>
            <div className="container-daily">
                {/* <div>
                    <p>Hallo {user.owner_name}</p>
                    <p>Kode Outlet {user.outlet_code}</p>
                </div> */}
                
                <h3>Ringkasan Hari ini</h3>                
                <div className="card-daily">
                    <p>Pendapatan Harian</p>
                    <h1>Rp {summary.totalPendapatan.toLocaleString('id-ID')}</h1>
                    <p>Total Order: {summary.totalOrder}</p>
                    <p>Kiloan: {summary.totalKiloan} Kg || Satuan: {summary.totalSatuan} Pcs</p>
                </div>
            </div>
        </>


    )
}