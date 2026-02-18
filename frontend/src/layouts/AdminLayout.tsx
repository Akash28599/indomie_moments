import { Outlet } from "react-router-dom";
// import { AdminHeader } from "../modules/common/components/PageHeader/AdminHeader";
import { Footer } from "../modules/common/components/Footer/Footer";
import { adminFooterConfig } from "../modules/common/components/Footer/constant";
import { Header } from "../modules/common/components/PageHeader";
import { adminHeaderConfig } from "../modules/common/components/PageHeader/constant";

const AdminLayout = () => {
  return (
    <>
      <Header config={adminHeaderConfig}/>
      <Outlet />
      <Footer config={adminFooterConfig} />
    </>
  );
};

export default AdminLayout;
