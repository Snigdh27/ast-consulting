import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Link,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchApiKey();
    fetchUsers();
  }, []);

  const fetchApiKey = () => {
    axios
      .get("/admin/api-key")
      .then((response) => {
        setApiKey(response.data);
      })
      .catch((error) => {
        console.error("Error fetching API key:", error);
      });
  };

  const updateApiKey = () => {
    const newApiKey = prompt("Enter the new API key:");
    if (newApiKey) {
      axios
        .post("/admin/api-key", { key: newApiKey })
        .then((response) => {
          alert(response.data);
          fetchApiKey();
        })
        .catch((error) => {
          console.error("Error updating API key:", error);
        });
    }
  };

  const deleteUser = (chatId) => {
    axios
      .delete(`/users/${chatId}`)
      .then((response) => {
        alert(response.data.message);
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const fetchUsers = () => {
    axios
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Telegram Weather Bot
      </Typography>
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          marginBottom: "20px",
          backgroundColor: "#161414",
          color: "rgb(192 190 102 / 87%)",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Manage API Key
        </Typography>
        <Typography variant="body1" gutterBottom>
          Current API Key: {apiKey}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={updateApiKey}
          style={{ marginTop: "10px" }}
        >
          Update API Key
        </Button>
      </Paper>

      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Current Users
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Chat ID</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.chatId}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.chatId}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteUser(user.chatId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default App;
