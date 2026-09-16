import { useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import SearchBar from '../../components/riwayat/SearchBar';
import { getOrders } from '../../services/dailySummary';
import {CardOrder} from "../../components/riwayat/CardOrder"


const RiwayatPage = () => {
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  // Ambil semua order sekali di awal
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data)
      console.log(data)
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
    if (!debouncedKeyword) return orders;

    const lowerKeyword = debouncedKeyword.toLowerCase();

    return orders.filter((order) =>
      order.invoice_no?.toLowerCase().includes(lowerKeyword) ||
      order.customer_name?.toLowerCase().includes(lowerKeyword) ||
      order.customer_phone?.includes(debouncedKeyword)
    );
  }, [orders, debouncedKeyword]);

  return (
    <div style={{ padding: '24px' }}>
      <h1>Daftar Order</h1>

      <SearchBar
        value={keyword}
        onChange={handleSearchChange}
        placeholder="Cari invoice, nama, atau no. HP..."
      />
        <CardOrder value={filteredOrders}/>

    </div>
  );
};

export default RiwayatPage;