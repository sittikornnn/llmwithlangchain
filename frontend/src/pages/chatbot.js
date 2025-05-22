import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const CHAT_API_URL = "http://localhost:8000/api/ask/";

export default function ProductPage() {
  // Chatbot-related states
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // Handle submitting a chat message
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const question = chatInput.trim();
    if (!question) return;

    // Add user's message immediately
    setChatHistory((prev) => [...prev, { sender: "user", text: question }]);
    setChatInput(""); // clear input for better UX

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();

      // Extract text from answer object or fallback to string
      const answerText =
        data.answer && typeof data.answer === "object"
          ? data.answer.result || JSON.stringify(data.answer)
          : data.answer;

      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: answerText || "Sorry, no answer available." },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "Failed to get response from server." },
      ]);
      console.error("Chat API error:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Chatbot Section */}
      <Paper elevation={3} sx={{ p: 3, mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Chatbot
        </Typography>

        <List
          sx={{
            height: 300,
            overflowY: "auto",
            bgcolor: "#f5f5f5",
            mb: 2,
            borderRadius: 1,
            padding: 1,
          }}
        >
          {chatHistory.length === 0 && (
            <ListItem>
              <ListItemText primary="Ask me anything!" />
            </ListItem>
          )}

          {chatHistory.map((msg, idx) => (
            <ListItem
              key={idx}
              sx={{
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  bgcolor: msg.sender === "user" ? "primary.main" : "grey.300",
                  color: msg.sender === "user" ? "primary.contrastText" : "black",
                  p: 1.5,
                  borderRadius: 2,
                  whiteSpace: "pre-wrap", // preserve newlines
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>

        <Box
          component="form"
          onSubmit={handleChatSubmit}
          sx={{ display: "flex", gap: 1 }}
        >
          <TextField
            label="Type your question..."
            fullWidth
            variant="outlined"
            size="small"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}