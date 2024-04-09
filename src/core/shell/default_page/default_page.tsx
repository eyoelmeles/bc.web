import { Box, Divider, Typography, Stack, Sheet, styled } from "@mui/joy";
import React, { PropsWithChildren } from "react";
import { APPBAR_HEIGHT } from "../layout/layout";

interface DefaultPageProps {
  title: string;
  primaryButton?: React.ReactElement;
  secondaryButton?: React.ReactElement;
  otherElement?: React.ReactElement;
}

export const StyledSheet = styled(Sheet)(({ theme }) => ({
  color: "inherit",
  height: `calc(100vh - ${APPBAR_HEIGHT} - 50)`,
}));

const DefaultPage = (props: PropsWithChildren<DefaultPageProps>) => {
  return (
    <StyledSheet
      sx={(theme) => ({
        margin: {
          sm: 'auto',
          md: 1
        },
        width: "100%",
        flex: 1,
        display: "flex",
        borderRadius: 6,
        flexDirection: "column",
        elevation: 16,
        boxShadow: 16,
      })}
      variant="outlined"
      style={{
        height: `calc(100vh - ${APPBAR_HEIGHT} - 50) !important,`
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flex={1}
          width="100%"
          sx={{ m: 0, p: 0 }}
        >
          <Typography
            alignSelf="start"
            level="h4"
            fontWeight="bold"
            color="neutral"
            sx={{ flexGrow: 1, }}
          >
            {props.title}
          </Typography>
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
