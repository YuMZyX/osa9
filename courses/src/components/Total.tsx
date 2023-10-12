import { TotalExercises } from "../types";

const Total = (props: TotalExercises) => {
  return <span>Number of exercises: {props.total}</span>;
};

export default Total;