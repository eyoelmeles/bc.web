import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useState } from "react";
import axios from "axios";
import useUserData from "../hooks/useUserData";
import { useDispatch } from "react-redux";
import { login } from "../store/auth_slice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../store/app_api";

export default function LoginFinal() {
  const [_, setData] = useUserData();
  const dispatch = useDispatch();
  const [staff, setStaff] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleStaffChange = () => {
    setStaff((staff) => !staff);
  };

  return (
    <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            width: 350,
            mx: "auto",
            my: 4,
            py: 3,
            px: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        >
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              try {
                const formData = new FormData(event.currentTarget);
                const response = await axios.post(
                  `${BASE_URL}/auth/login`,
                  {
                    userName: formData.get("userName"),
                    siteName: formData.get("site"),
                    password: formData.get("password"),
                  }
                );
                setData(response.data);
                dispatch(login());
                navigate("/site");
                // const formJson = Object.fromEntries(
                //   (formData as any).entries()
                // );
                // alert(JSON.stringify(formJson));
              } catch (e) {
                console.log("Error", e);
              }
            }}
          >
            <div>
              <Typography level="h4" component="h1">
                <b>Welcome!</b>
              </Typography>
              <Typography level="body-sm">Sign in to continue.</Typography>
            </div>
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input
                // html input attribute
                name="userName"
                placeholder="johndoe@email.com"
              />
            </FormControl>
            {!staff && (
              <FormControl>
                <FormLabel>Site</FormLabel>
                <Input
                  // html input attribute
                  name="site"
                  placeholder="Site"
                />
              </FormControl>
            )}
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                // html input attribute
                name="password"
                type="password"
                placeholder="password"
              />
            </FormControl>

            <Button sx={{ mt: 1 /* margin top */ }} type="submit">
              Log in
            </Button>
            <Typography
              endDecorator={
                <Button variant="plain" onClick={handleStaffChange}>
                  Sign in here
                </Button>
              }
              fontSize="sm"
              sx={{ alignSelf: "center" }}
            >
              {!staff ? "BuildConnect Staff Member?" : "BuildConnect Client"}
            </Typography>
          </form>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
