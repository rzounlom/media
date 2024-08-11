import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteUser = createAsyncThunk("users/delete", async (user) => {
  await axios.delete(`http://localhost:3005/users/${user.id}`);

  return user;
});
