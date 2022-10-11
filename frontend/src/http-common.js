import axios from "axios";
import { useSelector } from "react-redux";

const userValues = useSelector((state) => state.user);
const { token } = userValues;

export default axios.create({
  API_URL: "/api/goals/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
