import { useDispatch, useSelector } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

function GoalForm({ text, setText }) {
  const dispatch = useDispatch();
  const { goals } = useSelector((state) => state.goals);
  

  const handelSubmit = (e) => {
    e.preventDefault();
     
    dispatch(createGoal({ text }));
    setText("");
  };

  return (
    <section>
      <form onSubmit={handelSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="text"
            id="text"
            className="form-control text"
            placeholder="Enter Goal..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="form-group">
            <button className="btn btn-block btn-secondary mt-3 form-control">
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
