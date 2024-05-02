import { useState } from "react";
import DefaultPage from "../../../core/shell/default_page/default_page";
import { Box, Divider, Typography, Button } from "@mui/joy";
import { Add } from "@mui/icons-material";
import SiteRoles from "../components/site_roles";
import InviteMemberForm from "../components/invite_member_form";
import MemberTable from "../components/members_table";

export interface RoleProperty {
  name: string;
  index: number;
}

const ManageSiteTeam = () => {
  const [role, setRole] = useState<RoleProperty | null>(null);

  const [openForm, setOpenForm] = useState<boolean>(false);

  const handleToggleForm = () => {
    setOpenForm(!openForm);
  };

  return (
    <DefaultPage
      title="Manage Site Team"
      // primaryButton={
      //   selectedLookupType ? (
      //     <Button
      //       startDecorator={<Add />}
      //       variant="outlined"
      //       size="md"
      //       onClick={handleCreateLookup}
      //     >
      //       Add {selectedLookupType} Lookup
      //     </Button>
      //   ) : (
      //     <></>
      //   )
      // }
    >
      <Box display="flex" height="100%">
        <Box width="20%" height="100%">
          <SiteRoles role={role?.name ?? null} setRole={setRole} />
        </Box>
        <Box width="100%">
          <Box
            display="flex"
            justifyContent="space-between"
            padding={1}
            alignItems="center"
            minHeight={60}
          >
            <Typography level="h4" color="neutral">
              {role?.name}
            </Typography>
            <Button
              variant="outlined"
              startDecorator={<Add />}
              onClick={handleToggleForm}
            >
              Invite Member as {role?.name}
            </Button>
          </Box>
          <Divider />
          <MemberTable roleIndex={role?.index ?? null} />
        </Box>
      </Box>

      {role?.name && openForm && (
        <InviteMemberForm
          open={openForm}
          onClose={handleToggleForm}
          role={role.name}
          roleIndex={role.index}
          // lookupType={selectedLookupType}
        />
      )}
    </DefaultPage>
  );
};

export default ManageSiteTeam;
