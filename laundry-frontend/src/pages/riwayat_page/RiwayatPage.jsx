import { useState, useEffect, useMemo} from 'react';
import { debounce } from 'lodash';
import SearchBar from '../../components/riwayat/SearchBar';
import { getOrders } from '../../services/dailySummary';
import {CardOrder} from "../../components/riwayat/CardOrder"
import Header from '../../components/Header';
import { TabStatus } from '../../components/riwayat/TabStatus';
import { UseTabStatus } from '../../hooks/UseTabStatus';

const RiwayatPage = () => {
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  const {activeTab, statusList, changeTab} = UseTabStatus("semua")

  // Ambil semua order sekali di awal
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data)
    };
    fetchOrders();
  }, []);

  // Debounce: tunggu 400ms setelah user berhenti ngetik, baru update pencarian
  const debouncedSetKeyword = useMemo(
    () => debounce((val) => setDebouncedKeyword(val), 400),
    []
  );

  const handleSearchChange = (val) => {
    setKeyword(val); // langsung update, biar input terasa responsif
    debouncedSetKeyword(val); // tapi filter beneran ditunda
  };

  // Filter dijalankan tiap kali debouncedKeyword berubah
  const filteredOrders = useMemo(() => {
    let result = orders; 
    
    if(activeTab !== "semua"){
      result = result.filter((order)=> order.status?.toLowerCase() === activeTab.toLowerCase())
    }


    if (debouncedKeyword) {
      const lowerKeyword = debouncedKeyword.toLowerCase();
      result = result.filter((order)=>
        order.invoice_no?.toLowerCase().includes(lowerKeyword) ||
        order.customer_name?.toLowerCase().includes(lowerKeyword) ||
        order.customer_phone?.includes(debouncedKeyword)
      )
    };
    return result    
  }, [orders, activeTab, debouncedKeyword]);

  return (
    <>    
      <Header/>
      <div style={{ padding: '24px', display:'grid', gap:'1rem'}}>
        <div style={{ display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <h1>Daftar Order</h1>          
          <div style={{display:'flex', justifyContent: "end" }}>
            <SearchBar
            value={keyword}
            onChange={handleSearchChange}
            placeholder="Cari invoice, nama, atau no. HP..."
            
          />
          </div>
          
        </div>
        
        <TabStatus 
          statusList={statusList} 
          activeTab={activeTab} 
          onChangeTab={changeTab}
        />
          <CardOrder orders={filteredOrders}/>
      </div>
    </>
  );
};

export default RiwayatPage;