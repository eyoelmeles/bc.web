import { Divider, Stack } from "@mui/joy";
import DefaultPage from "../../../core/shell/default_page/default_page";
import ActivityHeader from "../component/header";
import ReportOverviewHeader from "../component/report_overview_header";
import ReportFilters from "../component/report_filters";
import ReportCard from "../component/report_card";

const SiteActivity = () => {
  return (
    <DefaultPage title="Site Activity">
      <ActivityHeader />
      <Divider />
      <ReportOverviewHeader />
      <Divider />
      <ReportFilters />
      <Stack spacing={2}>
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
      </Stack>
    </DefaultPage>
  );
};

export default SiteActivity;
