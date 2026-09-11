const AuthInput = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        style={{
          width: '95%',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '6px',
          fontSize: '14px',
        }}
      />
    </div>
  );
};

export default AuthInput;