import { COLORS } from "../../../public/css/color";
import Header from "../../components/Header";
import { DailyReport } from "../../components/dashboard/DailyReport";
import { Menu } from "../../components/dashboard/Menu";


const DashboardPage = () => {
  

  return (
  <>
  <style>{`

  
  `}</style>
  <div>
      <Header/>
      <div style={{ padding: '24px', display: "grid", gridTemplateColumns: '1fr 2fr', gap: '1rem', backgroundColor:COLORS.yellow.dark, borderBottomLeftRadius: "15px", borderBottomRightRadius: '15px', marginLeft: "1rem", marginRight: '1rem'}}>
          <DailyReport/>
          <Menu/>
      </div>
    </div>

  </>
  

  );
};

export default DashboardPage;