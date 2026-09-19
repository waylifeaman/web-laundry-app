// src/utils/formatDate.js
export const formatDate = (dateSource, options = {}) => {
  if (!dateSource) return '-';

  let dateObj;

  // 1. Firestore Timestamp Object (.toDate())
  if (typeof dateSource?.toDate === 'function') {
    dateObj = dateSource.toDate();
  } 
  // 2. Plain Object dengan _seconds
  else if (dateSource?._seconds) {
    dateObj = new Date(dateSource._seconds * 1000);
  } 
  // 3. String, Number, atau Date biasa
  else {
    dateObj = new Date(dateSource);
  }

  // Pengecekan tanggal tidak valid
  if (isNaN(dateObj.getTime())) return '-';

  const defaultOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options
  };

  return dateObj.toLocaleDateString('id-ID', defaultOptions);
};