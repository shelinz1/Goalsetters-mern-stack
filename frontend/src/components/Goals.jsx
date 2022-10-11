import { deleteGoal, updateGoal } from "../features/goals/goalSlice";
import { useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";

function Goals({ goal, text, setText }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteGoal(goal._id));
  };

  // const handleUpdate = () => {
  //   dispatch(updateGoal({ id: goal._id, text: text }));
  // };

  return (
    <>
      <div className="card mt-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="card-text">
            <div className="goal-content">
              <div className="text-capitalize">{goal.text}</div>
              <div className="setting-goals">
                <button className="btn btn=-delete" onClick={handleDelete}>
                  <AiFillDelete color="red" />
                </button>

                {/* <button className="btn btn=-delete" onClick={handleUpdate}>
                  updateGoal
                </button> */}
              </div>
              <div className="time">
                Time: {new Date(goal.createdAt).toLocaleString("en-US")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Goals;
