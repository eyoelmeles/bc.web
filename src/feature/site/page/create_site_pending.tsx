import { Button, Link, Sheet, Typography } from "@mui/joy";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatedSiteStatus = () => {
  const [paid, setPaid] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = () => {
    // set as active site
    navigate("/");
  };
  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        overflow: "auto",
        gap: {
          sm: 2,
          md: 4,
        },
        padding: {
          sm: 2,
          md: 4,
        },
        alignItems: "center",
      }}
    >
      {paid ? (
        <>
          <Typography level="h3">You are almost done!</Typography>
          <Typography level="body-md" textAlign="center">
            We are verifing the payment, Your project will be ready in 20
            minutes, if it doesn't call <Link>customer support</Link>
          </Typography>
        </>
      ) : (
        <>
          <Typography level="h3">
            Congrats, Site Created Successfully
          </Typography>
          <Button variant="outlined" onClick={handleClick}>
            Go to Dashboard
          </Button>
        </>
      )}
    </Sheet>
  );
};

export default CreatedSiteStatus;
