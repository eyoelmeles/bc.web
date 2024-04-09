import {
  Add,
  CreateNewFolder,
  Folder as MuiFolder,
  FolderOff,
  Person,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useGetFoldersQuery } from "../api/files_endpoints";
import { Folder } from "../model/folder";
import { useState } from "react";
import AddFolder from "../components/add_folders";
import AddFile from "../components/add_file";
import FileTable from "../components/file_table";
import { Box, Button, Divider, IconButton, Typography } from "@mui/joy";
import DefaultPage from "../../../core/shell/default_page/default_page";
import { useSelector } from "react-redux";

const FilesPage = () => {
  const [openAddFolder, setOpenAddFolder] = useState<boolean>(false);
  const [openAddFile, setOpenAddFile] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<Folder | undefined>(
    undefined
  );
  const site = useSelector((state: any) => state.site);
  const { data: folders } = useGetFoldersQuery({
    params: {
      siteId: site?.id
    }
  });

  return (
    <DefaultPage title="Folders">
      <Box display="flex" gap={1}>
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          height="100%"
          gap={2}
          paddingTop={2}
          alignItems="start"
          justifyContent="start"
          borderRight={1}
          borderColor={"#ccc"}
        >
          <Box
            display="flex"
            paddingX={2}
            width="100%"
            justifyContent="space-between"
            alignSelf="center"
            alignItems="center"
          >
            <Typography level="body-lg">
              Folders
            </Typography>
            <IconButton onClick={() => setOpenAddFolder(true)}>
              <CreateNewFolder />
            </IconButton>
          </Box>
          <List disablePadding sx={{ width: "100%", height: "100%" }}>
            {folders?.map((folder) => (
              <ListItem
                key={folder.id}
                sx={(theme) => ({
                  backgroundColor:
                    folder.id === selectedFolder?.id
                      ? theme.palette.action.selected
                      : "transparent", // Change "lightgray" to your desired highlight color
                })}
                button
                onClick={() => {
                  setSelectedFolder(folder);
                }}
              >
                <ListItemIcon>
                  <MuiFolder />
                </ListItemIcon>
                <ListItemText primary={folder.name} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box flex={4} display="flex" flexDirection="column">
          <Toolbar
            component={Box}
            display="flex"
            justifyContent="space-between"
          >
            <Typography fontWeight={"bold"}>{selectedFolder?.name}</Typography>
            {selectedFolder && (
              <Button
                variant="outlined"
                startDecorator={<Add />}
                // ="contained"
                onClick={() => setOpenAddFile(true)}
              >
                Create Files
              </Button>
            )}
          </Toolbar>
          <Divider />
          {selectedFolder && <FileTable folderId={selectedFolder.id} />}
        </Box>
      </Box>
      {openAddFolder && (
        <AddFolder
          open={openAddFolder}
          onClose={() => setOpenAddFolder(false)}
        />
      )}
      {openAddFile && selectedFolder && (
        <AddFile
          open={openAddFile}
          onClose={() => setOpenAddFile(false)}
          folder={selectedFolder}
        />
      )}
    </DefaultPage>
  );
};

export default FilesPage;
