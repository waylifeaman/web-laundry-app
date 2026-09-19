
import { formatRupiah } from "../../public/shared/formatRupiah";
import { useOutlet } from "./useOutlet";
import { formatDate } from "../utils/formatDate";

export const useSendWhatsapp = () => {
    
    const { outletName, outletAddress } = useOutlet();   

  const sendWhatsapp = (item) => {
    const total = item.items[0]?.qty * item.items[0]?.price_per_unit;
    
    const formattedDate = formatDate(item?.created_at);
    const pesan = ` 
        ${outletName}
        Alamat Laundry: ${outletAddress}
        
        Invoice: ${item.invoice_no}
        Customer: ${item.customer_name}
        Alamat: ${item.customer_address}
        Tanggal: ${formattedDate}

        Detail Pesanan:
        . ${item.items[0]?.product_name} (${item.items[0]?.service_type}) - ${item.items[0]?.qty} x ${formatRupiah(item.items[0]?.price_per_unit)} = ${formatRupiah(total)}
        . ${item.perfume} || ${formatRupiah(item.perfume_price)}

        Total Biaya: ${formatRupiah(item.total_price)}
        Status Pembayaran: ${item.payment_status}
        status: ${item.status}

        Terima kasih telah menggunakan layanan kami 
        Untuk Baju kelunturan bukan tanggung jawab kamiKomplain diterima maximal 1x24 jam`;

    const nomorWa = item.customer_phone.replace(/^0/, '62');
    const url = `https://wa.me/${nomorWa}?text=${encodeURIComponent(pesan)}`;

    window.open(url, '_blank');
  };

  return sendWhatsapp;   // <- return FUNCTION-nya, bukan langsung jalanin
};