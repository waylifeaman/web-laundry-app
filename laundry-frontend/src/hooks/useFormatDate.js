import { useMemo } from 'react';

export const useFormatDate = (dateSource, options = {}) => {
  return useMemo(() => {
    if (!dateSource) return '-';

    let dateObj;

    // 1. Jika data berupa Firestore Timestamp Object dengan method .toDate()
    if (typeof dateSource?.toDate === 'function') {
      dateObj = dateSource.toDate();
    } 
    // 2. Jika data berupa Plain Object dengan _seconds (hasil serialize Firestore)
    else if (dateSource?._seconds) {
      dateObj = new Date(dateSource._seconds * 1000);
    } 
    // 3. Jika data berupa String, Number (milliseconds), atau Date object biasa
    else {
      dateObj = new Date(dateSource);
    }

    // Pengecekan jika tanggal tidak valid (NaN)
    if (isNaN(dateObj.getTime())) return '-';

    // Format tampilan default: 12 September 2026
    const defaultOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      ...options
    };

    return dateObj.toLocaleDateString('id-ID', defaultOptions);
  }, [dateSource, JSON.stringify(options)]);
};