import { Container, Box, Typography, Paper } from "@mui/material";

export default function AboutBox() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          border: "2px solid #1976d2",
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sittikorn Chaloemkittichai
        </Typography>
        <Typography variant="body1" gutterBottom>
          📧 Email: sittikorn720@gmail.com
        </Typography>
        <Typography variant="body1">
          📞 Tel: 0616046040
        </Typography>
      </Paper>
    </Container>
  );
}
