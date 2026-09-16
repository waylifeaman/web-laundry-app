import { MdOutlineHistory, MdBarChart,MdPerson  } from "react-icons/md";
import { RiShoppingBagFill } from "react-icons/ri";
import { BsPersonVcardFill } from "react-icons/bs";
import { RiFlowerFill } from "react-icons/ri";

import { Link } from "react-router-dom";


export const Menu = ()=>{
    return(
        <>
        <style>{`        
            .menu{
                background-color: var(--color-gray-100);
                padding: 1.5rem;
                display: flex,
                flex-direction: column;
                justify-items: center;
                border-radius: 15px;                
            }
        
        `}</style>
        <div style={{ display: 'grid', gap: "1rem"}}>
            <h3>Menu Cepat</h3 >
            <div className="card-menu" style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: '1rem'}}>
                <Link to='/riwayat'><div className="menu">
                    <p style={{ backgroundColor: "var(--color-yellow-light)", padding: '1rem', borderRadius: '10px' }}><MdOutlineHistory size={50}/></p>
                    <p style={{ paddingTop: '1rem' }}>Riwayat</p>
                    </div></Link>
                <Link to='/report'><div className="menu">
                    <p style={{ backgroundColor: "var(--color-yellow-light)", padding: '1rem', borderRadius: '10px' }}><MdBarChart size={50}/></p>
                    <p style={{ paddingTop: '1rem' }}>Laporan</p>
                    </div></Link>
                <Link to='/kasir'><div className="menu">
                    <p style={{ backgroundColor: "var(--color-yellow-light)", padding: '1rem', borderRadius: '10px' }}><MdPerson  size={50}/></p>
                    <p style={{ paddingTop: '1rem' }}>Kasir</p>
                    </div></Link>
                <Link to='/produk'><div className="menu">
                    <p style={{ backgroundColor: "var(--color-yellow-light)", padding: '1rem', borderRadius: '10px' }}><RiShoppingBagFill size={50}/></p>
                    <p style={{ paddingTop: '1rem' }}>Produk</p>
                    </div></Link>
                <Link to='/customer'><div className="menu">
                    <p style={{ backgroundColor: "var(--color-yellow-light)", padding: '1rem', borderRadius: '10px' }}><BsPersonVcardFill size={50}/></p>
                    <p style={{ paddingTop: '1rem' }}>Customer</p>
                    </div></Link>
                <Link to='/parfum'><div className="menu">
                    <p style={{ backgroundColor: "var(--color-yellow-light)", padding: '1rem', borderRadius: '10px' }}><RiFlowerFill size={50}/></p>
                    <p style={{ paddingTop: '1rem' }}>Parfum</p>
                    </div></Link>
               

            </div>
        </div>
        
        </>

    )
}