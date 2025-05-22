import React, { useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import {
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Grid,
} from "@mui/material";

const API_URL = "http://localhost:8000/product/";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ id: null, name: "", price: "" });
    const [search, setSearch] = useState("");

    // ดึงข้อมูลสินค้า
    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}get/`);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // ฟังก์ชันเพิ่ม/แก้ไขสินค้า
    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = form.id ? "PUT" : "POST";
        const endpoint = form.id ? `${API_URL}update/${form.id}/` : `${API_URL}add/`;

        try {
            await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, price: form.price }),
            });

            // รีเซ็ตฟอร์ม
            setForm({ id: null, name: "", price: "" });
            fetchProducts();
        } catch (error) {
            console.error("Failed to submit form", error);
        }
    };

    // ฟังก์ชันลบสินค้า
    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}delete/${id}/`, { method: "DELETE" });
            fetchProducts();
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    };

    // กดปุ่ม Edit จะเซ็ตข้อมูลลงฟอร์ม
    const handleEdit = (product) => {
        setForm(product);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Product Manager
            </Typography>

            {/* ฟอร์มเพิ่ม/แก้ไขสินค้า */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
                    <TextField
                        label="Product Name"
                        fullWidth
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        required
                    />
                    <Button variant="contained" type="submit" fullWidth>
                        {form.id ? "Update Product" : "Add Product"}
                    </Button>
                </Box>
            </Paper>

            {/* Search Bar */}
            <TextField
                label="Search products..."
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 3 }}
            />

            {/* รายการสินค้าในรูปแบบ HeroCard */}
            <Grid container spacing={3}>
                {products
                    .filter((product) =>
                        product.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <HeroCard
                                hero={product}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
}