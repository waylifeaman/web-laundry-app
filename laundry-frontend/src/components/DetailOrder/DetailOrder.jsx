import { IoMdArrowBack } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { FaWhatsapp, FaPrint  } from "react-icons/fa";
import { COLORS } from "../../../public/css/color";
import { formatRupiah } from "../../../public/shared/formatRupiah";
import { useFormatDate } from "../../hooks/useFormatDate";
import { useOutlet } from "../../hooks/useOutlet";
import { useNavigate } from 'react-router-dom';
import { useSendWhatsapp } from "../../hooks/useSendWhatsapp";

export const DetailOrder = ({data}) =>{
    const formatDate = useFormatDate(data?.created_at);
    const {outletName} = useOutlet();
    const navigate = useNavigate();
    const SendWhatsapp = useSendWhatsapp();

    console.log("nama outlet", outletName)

    // const 
    if(!data) return null;
    console.log(data)

    return(
        <>
            <style>{`
                .container{
                    display: grid;
                    gap: 1rem;   
                }
                .container-content{
                    display: grid;
                    justify-items: center;
                    gap: 1rem;
                }
                .top{
                    width: 800px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                }
                .head{

                    padding: 1rem;
                    display: grid;
                    grid-template-columns: 0.5fr 1fr;                    
                    align-items: center;
                    background-color: ${COLORS.yellow.dark};
                }
                .card-customer{
                    padding: 1rem;
                    background-color: ${COLORS.yellow.dark};  
                    width: 800px;
                    display: grid;
                    grid-template-columns: 0.5fr 2fr 0.5fr;
                    border-radius: 20px;
                    
                }
                .person{
                    background-color: ${COLORS.gray[200]};
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 50px;
                    height: 50px;
                }
                button{
                    border:none;
                    background-color: ${COLORS.gray[200]};
                    color: ${COLORS.green.dark};
                    padding: 0.5rem;
                    width: auto;
                    border-radius: 15px;
                    cursor: pointer;
                }
                .aksi{
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .card-order{
                    width: 800px;
                    padding:1rem;
                    align-items: center;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    background-color: ${COLORS.gray[50]};
                    border: 1px solid ${COLORS.gray[400]};
                    border-radius: 15px;
                    
                    }

                .container-order{
                    width: 800px;
                    background-color: ${COLORS.gray[50]};
                    border-radius: 15px;
                    border: 1px solid ${COLORS.gray[400]}
                }
                td{
                    padding: 0.5rem;
                }
                .data{
                    text-align: end;
                }
            `}</style>
            <div className="container">
                <div className="head">
                    <IoMdArrowBack size={30} style={{ cursor: 'pointer' }} onClick={()=>navigate('/riwayat')}/>
                    <h1>RINCIAN PESANAN</h1>                    
                </div>
                <div className="container-content">
                    <div className="top">
                        <div className="logo" style={{ display: "flex", alignItems: 'center' }}>
                            <img src="/public/assets/logo2.png" alt="logo" width={"50rem"}/>
                            <h3>{outletName}</h3>
                        </div>
                        <div className="inv" style={{ display: "grid", alignItems: 'center', textAlign: "end"}}>
                             <h3>{data.invoice_no}</h3>
                        </div>
                    </div>

                    <div className="card-customer">
                        <div style={{ display: "flex", justifyContent: "center", alignItems:'center' }}>
                            <div className="person">
                                <IoPerson size={24}/>
                            </div>
                        </div>
                        
                        <div className="data-cus">
                            <h2>{data.customer_name}</h2>
                            <p>{data.customer_phone}</p>
                            <p>{data.customer_address}</p>
                        </div>
                        <div className="aksi">
                            <button onClick={() => SendWhatsapp(data)}>
                                <FaWhatsapp/> Kirim
                            </button>
                            <button>
                                <FaPrint />
                            </button>
                        </div>
                    </div>
                    <div className="card-order">
                        <div className="left" style={{ display: "flex", flexDirection: 'column' ,gap: '1rem' }}>
                            <p>{data.items[0]?.product_type} ({data.items[0]?.service_type})</p>
                            <h3>{data.items[0]?.product_name}</h3>
                            <p>{formatRupiah(data.items[0].price_per_unit)} x {data.items[0].qty} {data.items[0]?.product_type === "Kiloan" ? "Kg" : "Pcs"}</p>
                        </div>
                        <div className="right" style={{ textAlign: 'end' }}>
                            <p>Quantity: {data.items[0].qty} {data.items[0]?.product_type === "Kiloan" ? "Kg" : "Pcs"}</p>
                            <h2>{formatRupiah(data.total_price)}</h2>
                        </div>
                    </div>
                    <div className="container-order" >                   
                        <table style={{ width: "800px", padding: "1rem", borderCollapse: "collapse"}}>
                            <tbody >
                                <tr>
                                    <td>Dibuat Oleh</td>
                                    <td className="data">{data.created_by}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td className="data">{data.status}</td>
                                </tr>
                                <tr>
                                    <td>Tanggal Masuk</td>
                                    <td className="data">{formatDate}</td>
                                        
                                </tr>
                                <tr>
                                    <td>Parfum</td>
                                    <td className="data">{data.perfume} ({formatRupiah(data.perfume_price)})</td>
                                </tr>
                                <tr style={{ borderBottom: `1px solid ${COLORS.gray[400]}` }}>
                                    <td>Status Pembayaran</td>
                                    <td className="data">{data.payment_status}</td>
                                </tr>
                                <tr>
                                    <td>Sub Total</td>
                                    <td className="data"><h4>{formatRupiah(data.total_price)}</h4></td>
                                </tr>
                            </tbody>
                        </table>                  
                    </div>
                </div>                            
            </div>
        </>
        
    )


} 