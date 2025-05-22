import { Card, CardContent, Typography, Button, Stack } from "@mui/material";

export default function HeroCard({ hero, onEdit, onDelete }) {
  return (
    <Card
      sx={{
        width: 300,
        height: 180,  // กำหนดความสูงตายตัว
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // จัดให้ปุ่มอยู่ด้านล่างเสมอ
      }}
    >
      <CardContent>
        <Typography variant="h6" component="h2" fontWeight="bold">
          {hero.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Price: {hero.price}
        </Typography>
      </CardContent>

      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        <Button variant="text" color="primary" onClick={() => onEdit(hero)}>
          Edit
        </Button>
        <Button variant="text" color="error" onClick={() => onDelete(hero.id)}>
          Delete
        </Button>
      </Stack>
    </Card>
  );
}