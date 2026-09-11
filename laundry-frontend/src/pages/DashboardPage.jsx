const DashboardPage = () => {
  const outlet = JSON.parse(localStorage.getItem('outlet'));

  return (
    <div style={{ padding: '24px' }}>
      <h1>Dashboard</h1>
      <p>Selamat datang, {outlet?.name}!</p>
    </div>
  );
};

export default DashboardPage;