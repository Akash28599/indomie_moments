import { Outlet } from "react-router-dom";
import { Footer } from "../modules/common/components/Footer/Footer";
import { Header } from "../modules/common/components/PageHeader";
import { userFooterConfig } from "../modules/common/components/Footer/constant";
import { userHeaderConfig } from "../modules/common/components/PageHeader/constant";


const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed / Sticky Header */}
      <Header config={userHeaderConfig} />

      {/* 🔥 MAIN CONTENT OFFSET */}
      <main className="flex-1" >
        <Outlet />
      </main>

      <Footer config={userFooterConfig} />
    </div>
  );
};

export default UserLayout;
