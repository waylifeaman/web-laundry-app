import { Link } from "react-router-dom";
import { useState} from "react";

const Header = ()=>{
    const [outletName] = useState(()=>{
        const outletData = localStorage.getItem('outlet')
        return outletData ? JSON.parse(outletData).name : ''
    })


    return (
        <>      
            <style>{`
                li{
                    text-align: center;
                    padding: 10px;
                    
                }   
                li:hover{
                    border:1px solid var(--color-blue-dark);
                }
                .active{
                    border:1px solid var(--color-blue-dark);
                }

            
            
            
            `}</style>
            
              <div className="header-container" style={{ backgroundColor: "white", display:"grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems:'center'}}>
                <div className="logo" style={{ display:'flex', alignItems:'center' }}>
                    <img src="assets/logo2.png" alt="" width="20%" />
                    <h2>{outletName}</h2>
                </div>
                <div>
                    
                </div>
                <nav>
                    <ul style={{ display:'grid', gridTemplateColumns: '1fr 1fr 1fr', listStyle: 'none'}}>
                        <li className="active"><Link to='/home'>Home</Link></li>
                        <li><Link to='/order'>Order</Link></li>
                        <li><Link to='/setting'>Setting</Link></li>
                    </ul>
                </nav>
            </div>
        </>

    )
} 


export default Header;