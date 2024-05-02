import { Box, Divider, Typography, Stack, Sheet, styled, Link } from "@mui/joy";
import React, { PropsWithChildren } from "react";
import { APPBAR_HEIGHT } from "../layout/layout";
import { useNavigate } from "react-router-dom";

interface DefaultPageProps {
  title: string;
  goBack?: boolean;
  primaryButton?: React.ReactElement;
  secondaryButton?: React.ReactElement;
  otherElement?: React.ReactElement;
  small?: boolean;
}

export const StyledSheet = styled(Sheet)(() => ({
  color: "inherit",
  height: `calc(100vh - ${APPBAR_HEIGHT} - 50)`,
}));

const DefaultPage = (props: PropsWithChildren<DefaultPageProps>) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <StyledSheet
      sx={{
        margin: "auto",
        width: props.small ? "35%" : "100%",
        // flex: 1,
        display: "flex",
        borderRadius: 6,
        flexDirection: "column",
        elevation: 16,
        boxShadow: 16,
        overflow: "auto",
      }}
      variant="outlined"
      style={{
        height: "98%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flex={1}
          width="100%"
          sx={{ m: 0, p: 0 }}
        >
          <Stack direction="row" spacing={1}>
            {!props.goBack ?? (
              <Link variant="plain" onClick={handleBack}>
                Back
              </Link>
            )}
            <Typography
              alignSelf="center"
              level="h4"
              fontWeight="bold"
              color="neutral"
              sx={{ flexGrow: 1 }}
            >
              {props.title}
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row">
            {props.otherElement}
            {props.secondaryButton}
            {props.primaryButton}
          </Stack>
        </Box>
      </Box>
      <Divider />
      <Box flex={1}>{props.children}</Box>
    </StyledSheet>
  );
};

export default DefaultPage;
