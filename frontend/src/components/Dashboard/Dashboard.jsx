// import MarketData from "../MarketData/MarketData";
import Navbar from "../Navbar/Navbar";
import OptionChain from "../OptionChain/OptionChain";

function Dashboard() {
  return (
    <div className="min-h-screen max-h-screen bg-slate-100 overflow-hidden">
      <Navbar />
      <div className=" bg-white shadow-2xl m-4 pb-20 rounded-lg overflow-auto max-h-screen">
        <OptionChain />
      </div>
    </div>
  );
}

export default Dashboard;
