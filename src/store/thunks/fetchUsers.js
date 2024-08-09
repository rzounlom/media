import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  await pause(5000);
  const { data } = await axios.get("http://localhost:3005/users");

  return data;
});
