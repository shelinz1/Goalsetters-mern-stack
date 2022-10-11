import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalForm from "../components/GoalForm";
import Goals from "../components/Goals";


const Dashboard = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return "Loading";
  }

  return (
    <>
      <h1>Dashboard</h1>
      <p style={{ fontSize: "40px", fontWeight: "bold" }}>
        Welcome <span style={{ color: "#FCA61F" }}>{user && user.name}</span>
      </p>
      <GoalForm text={text} setText={setText} />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <Goals key={goal._id} goal={goal} text={text} setText={setText} />
            ))}
          </div>
        ) : (
          <h3 className="text-center mt-3"> You Have Not Set Any Goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
