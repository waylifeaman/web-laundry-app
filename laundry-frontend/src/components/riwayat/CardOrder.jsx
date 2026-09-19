import {COLORS} from '../../../public/css/color';
import {formatRupiah} from '../../../public/shared/formatRupiah';
import { MdRefresh } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export const CardOrder = ({ orders = []}) => {
  const navigate = useNavigate();

  return (
    <>
     <style>{`
    .mid-line {
        display:  flex;
        gap:1rem;
        color: ${COLORS.gray[500]};
        font-size: 13px;
        
    }
    .btn{
        padding: 5px;
        color: ${COLORS.gray[50]};
        text-align: center;
        border-radius: 5px;
        }
    .col-harga{
        text-align:center;
        display: grid;
    }
    
  `}</style>       
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", justifyContent:'center', alignItems:'center'}}>  
    {orders.length === 0 ? (
        <p>Tidak ada data</p>
      ) : (
        orders.map((item) => (
          <div
            key={item.id}
            style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr 1.5fr 1fr ", backgroundColor: COLORS.gray[100], width: "90%", borderRadius: "10px", gap: '1rem', padding: "1rem"}}
          >
            <div className='tgl' style={{ display: 'grid', justifyContent:'center', textAlign:'center'}}>
                <p style={{ color: COLORS.green.dark }}>{item.items[0] ?.service_type}</p>
                <h1 >{new Date(item.created_at).getDate()}</h1>
                <p>{new Date(item.created_at).toLocaleDateString('id-ID', { month: 'long' })}</p>
            </div>
            <div style={{ display:'grid', gap:"0.5rem" }}>
                <div className='mid-line'>
                    <p>  {new Date(item.created_at).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    })}</p>
                    <p>||</p>
                    <p>Order: {item.invoice_no}</p>
                    
                </div>
                <div>
                    <h1>{item.customer_name}</h1>
                    <p>{item.customer_phone}</p>
                </div>
                <div className='mid' style={{ display:'flex', gap:'1rem' }}>
                        <p className='btn'
                         style={{ backgroundColor: item.payment_status === "Lunas" ? COLORS.green.base : COLORS.yellow.dark, }}
                    >{item.payment_status}</p>

                        <p className='btn' style={{cursor:'pointer', backgroundColor:'red', }} onClick={()=>navigate(`/orders/${item.id}`)}>Lihat</p>
                </div>
            </div>
            <div style={{ display:'grid', gap:"0.5rem" }}>
                    <div className='mid-line' style={{ display:"grid", gridTemplateColumns: "1fr 1fr 1fr", textAlign: "center"}}>
                      <p>Item</p>
                      <p>Jumlah</p>
                      <p>Parfum</p>
                    </div>
                    <div style={{  display:"grid", gridTemplateColumns: "1fr 1fr 1fr", textAlign: "center"}}>
                      <p>{item.items[0]?.product_name}<br/>{formatRupiah(item.items[0]?.price_per_unit)}</p>
                      <p>x {item.items[0].qty} {item.items[0].product_type === "Kiloan"? "Kg" : "Pcs"}</p>
                      <p>{item.perfume}<br/>{formatRupiah(item.perfume_price)}</p>
                    </div>
            </div>
            <div className='col-harga'>
                <div className='mid-line' style={{ display: 'flex', justifyContent:'center'}}>
                  <p>Total</p>
                </div>
                <div style={{ display: 'grid', gap:'1rem' }}>                  
                  <h3>{formatRupiah(item.total_price)}</h3>
                  <span ><MdRefresh size={30} style={{ cursor:'pointer', borderRadius: "10px" ,padding:'4px',backgroundColor: "var(--color-yellow-dark)" }}/></span>
                </div>
            </div>
          </div>
        ))
      )}
    </div>
    </>
  );
};