import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getOrderById } from "../../services/dailySummary";
import { DetailOrder } from "../../components/DetailOrder/DetailOrder";

function DetailOrderPage() {
  const { id } = useParams();
  const location = useLocation();

  // Ambil data dari state navigasi jika ID cocok
  const [orderData, setOrderData] = useState(location.state?.orderData || null);
  const [loading, setLoading] = useState(!location.state?.orderData);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(id);
        setOrderData(data);
      } catch (err) {
        console.error("Gagal mengambil detail:", err);
      } finally {
        setLoading(false);
      }
    };

    // Jalankan fetch HANYA jika orderData kosong dan ID tersedia
    if (!orderData && id) {
      fetchDetail();
    }
  }, [id]); // 👈 Cukup masukkan `id` sebagai dependensi

  if (loading) return <p>Memuat detail order...</p>;
  if (!orderData) return <p>Data order tidak ditemukan.</p>;

  return (
    <div>
      <DetailOrder data={orderData} />
    </div>
  );
}

export default DetailOrderPage;