import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Avatar,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import React, { useState } from "react";
import { useGetFileByFolderIdQuery } from "../api/files_endpoints";
import { FileModel } from "../model/file";

interface FileTableProps {
  folderId: string;
}

interface RowProps {
  row: FileModel;
}

const Row: React.FC<RowProps> = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={row.id}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{row.fileName}</TableCell>
        <TableCell>
          <Avatar src={row.file} variant="rounded" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Details</TableCell>
                    <TableCell>File Type</TableCell>
                    <TableCell>X</TableCell>
                    <TableCell>Y</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.fileDetails.map((fileDetail, index) => (
                    <TableRow key={index}>
                      <TableCell>{fileDetail.details}</TableCell>
                      <TableCell>{fileDetail.fileType}</TableCell>
                      <TableCell>{fileDetail.x}</TableCell>
                      <TableCell>{fileDetail.y}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const FileTable = (props: FileTableProps) => {
  const { data: files } = useGetFileByFolderIdQuery({
    params: {
      folderId: props.folderId,
    },
  });
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>File</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files?.map((file: FileModel) => (
            <Row key={file.id} row={file} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FileTable;
