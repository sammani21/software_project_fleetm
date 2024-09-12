import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import FeatureIcon from "@mui/icons-material/StarBorder"; // Example icon for features

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: 'url("/assets/landing-bg.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(237, 232, 245, 0.9)", // Adds a transparent overlay
      }}
    >
      <AppBar position="sticky" sx={{ backgroundColor: "#007BFF" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Romodo
          </Typography>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 8, mb: 4 }}>
        <Box sx={{ textAlign: "center", my: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Romodo
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Your ultimate fleet management solution.
          </Typography>
          <Button
            variant="contained"
            startIcon={<RocketLaunchIcon />}
            sx={{
              mt: 3,
              color: "white",
              backgroundColor: "#007BFF",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
          <Divider sx={{ my: 5, borderColor: "rgba(0, 0, 0, 0.3)" }} />
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {[1, 2, 3].map((feature) => (
            <Grid item key={feature} xs={12} md={4}>
              <Card
                sx={{
                  minHeight: "200px",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  color: "#000",
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    <FeatureIcon
                      sx={{ verticalAlign: "middle", marginRight: 1 }}
                    />
                    Feature {feature}
                  </Typography>
                  <Typography>Feature {feature} is coming soon!</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
      </Container>

      <br></br>
      <br></br>
      <Box
        sx={{
          backgroundColor: "#007BFF",
          py: 3,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography variant="body2" component="p">
          &copy; {new Date().getFullYear()} Romodo. All rights reserved.
        </Typography>
        <Button color="inherit" onClick={() => navigate("/about")}>
          About Us
        </Button>
        <Button color="inherit" onClick={() => navigate("/contact")}>
          Contact
        </Button>
        {/* Add more footer links as needed */}
      </Box>
    </Box>
  );
};

export default LandingPage;
