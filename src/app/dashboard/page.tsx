import DashboardComponent from "@/components/Dashboard/DashboardComponent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Dashboard() {
  return (
    <>
      <DefaultLayout>
        <DashboardComponent />
      </DefaultLayout>
      {/* <LoginPage></LoginPage> */}
    </>
  );
}
