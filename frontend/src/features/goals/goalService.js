import axios from "axios";

const API_URL = "/api/goals/";

// Create new goal
const createGoal = async (text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, text, config);

  return response.data;
};

// get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

//delete goal
const deleteGoal = async (dataId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + dataId, config);

  return response.data;
};


const goalService = { createGoal, getGoals, deleteGoal };

export default goalService;
