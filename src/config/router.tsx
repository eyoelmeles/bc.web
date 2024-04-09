import { Navigate, Route, Routes } from "react-router-dom";
import Shell from "../core/shell/shell";
import SitePage from "../feature/site/page/site_page";
import SiteDetail from "../feature/site/page/site_detail";
import UsersPage from "../feature/user/page/users_page";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Shell />,
//     children: [
//       {
//         path: "sites",
//         element: <SitePage />,
//       },
//       {
//         path: "sites/:id",
//         element: <SiteDetail />,
//       },
//       {
//         path: "users",
//         element: <UsersPage />,
//       },
//       {
//         path: "users/:id",
//         element: <SiteDetail />,
//       },
//       {
//         path: "login",
//         element: <LoginPage />,
//       },
//     ],
//   },
// ]);

import UserDetail from "../feature/user/page/user_detail";
import LoginPage from "../core/auth/page/login";
import { LookupPage } from "../feature/lookup/pages/lookup_page";
import ChartsPage from "../feature/charts/pages/charts_page";
import FilesPage from "../feature/files/page/files_page";
import FormulaScreen from "../feature/formula/screens/formula_screen";
import TaskScreen from "../feature/task/page/task_page";
import WorkItemPage from "../feature/work_item/page/work_item_page";
import SchedulePage from "../feature/schedule/page/schedule_page";
import InspectionPage from "../feature/inspection/page/inspection_page";
import SiteActivity from "../feature/site_activity/page/site_activity";
import SiteReportPage from "../feature/site_report/page/site_report_page";
import RFIPage from "../feature/rfi/page/rfi_page";

const AppRoute = () => {
  const token = localStorage.getItem("userData");
  return (
    <>
      {token ? (
        <Routes>
          <Route path="/" element={<Shell />}>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route index element={<ChartsPage />} />
            <Route path="site" element={<SitePage />} />
            <Route path="site/:id" element={<SiteDetail />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="site-activity" element={<SiteActivity />} />
            <Route path="site-report" element={<SiteReportPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="rfi" element={<RFIPage />} />
            <Route path="schedule/:id" element={<WorkItemPage />} />
            <Route path="inspection" element={<InspectionPage />} />
            <Route path="work-item" element={<WorkItemPage />} />
            <Route path="configuration">
              <Route path="lookup" element={<LookupPage />} />
              <Route path="permissions" element={<UserDetail />} />
              <Route path="files" element={<FilesPage />} />
              <Route path="formula" element={<FormulaScreen />} />
              <Route path="tasks" element={<TaskScreen />} />
              <Route path="work-item" element={<FilesPage />} />
            </Route>
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
};

export default AppRoute;
