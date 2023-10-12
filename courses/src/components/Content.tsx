import { CoursePart } from "../types";
import Part from "./Part";

interface Props {
  courseParts: CoursePart[]
}

const Content = ({ courseParts } : Props) => {
  
  return (
    <div>
      {Object.values(courseParts).map((part: CoursePart) => {
          return <Part key={part.name} part={part} />
        })}
    </div>
  );
};

export default Content;