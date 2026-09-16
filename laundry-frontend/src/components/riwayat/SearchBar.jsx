import { COLORS } from '../../../public/css/color';

const SearchBar = ({ value, onChange, placeholder = 'Cari...' }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        maxWidth: '360px',
        padding: '10px 14px',
        border: `1px solid ${COLORS.gray[300]}`,
        borderRadius: '8px',
        fontSize: '14px',
        marginBottom: '16px',
      }}
    />
  );
};

export default SearchBar;