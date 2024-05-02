import { Box } from "@mui/joy";
import { useEffect, useMemo } from "react";
import { useGetUsersBySiteQuery } from "../../user/api/user.api";
import { useSelector } from "react-redux";
import { User } from "../../user/model/user";
import GenericTable, { JoyTableColumn } from "../../../core/components/table";

interface MemberTableProps {
  roleIndex: number | null;
}

const MemberTable: React.FC<MemberTableProps> = (props) => {
  const site = useSelector((state: any) => state.site);
  console.log(site);
  const { data: users, isLoading } = useGetUsersBySiteQuery({
    params: {
      siteId: site?.id,
      role: props?.roleIndex,
    },
  });

  const col = useMemo<Array<JoyTableColumn<User>>>(
    () => [
      {
        header: "Full Name",
        accessorKey: "fullName",
      },
      {
        header: "Owner",
        accessorKey: "email",
      },
    ],
    []
  );

  useEffect(() => {
    console.log(users);
  }, []);

  return (
    <Box width="96%" margin="1rem auto">
      <GenericTable<User>
        unique={"id"}
        columns={col}
        data={users ?? []}
        size="sm"
      />
    </Box>
  );
};

export default MemberTable;
