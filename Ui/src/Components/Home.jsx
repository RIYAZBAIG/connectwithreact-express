import { Button, Card, CardContent, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      //token && navigate("/")
      navigate("/login");
    }
  }, []);
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Button
                variant="contained"
                onClick={navigate("/login")}
                fullWidth
                color="success"
              >
                Log In
              </Button>
            </Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                onClick={handleLogout}
                fullWidth
                color="success"
              >
                Log Out
              </Button>
            </Grid>
          </Grid>
          <h1>Home Page</h1>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
