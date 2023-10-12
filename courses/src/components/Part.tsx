import { CoursePart } from "../types";

interface Props {
  part: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: Props) => {

  const partParse = (part: CoursePart): CoursePart => {
    switch(part.kind) {
      case "basic": {
        const partObj: CoursePart = {
          name: part.name,
          description: part.description,
          exerciseCount: part.exerciseCount,
          kind: part.kind
        }
        return partObj;
      }
      case "group": {
        const partObj2: CoursePart = {
          name: part.name,
          groupProjectCount: part.groupProjectCount,
          exerciseCount: part.exerciseCount,
          kind: part.kind
        }
        return partObj2;
      }
      case "background": {
        const partObj3: CoursePart = {
          name: part.name,
          description: part.description,
          exerciseCount: part.exerciseCount,
          backgroundMaterial: part.backgroundMaterial,
          kind: part.kind
        }
        return partObj3;
      }
      case "special": {
        const partObj4: CoursePart = {
          name: part.name,
          description: part.description,
          exerciseCount: part.exerciseCount,
          requirements: part.requirements,
          kind: part.kind
        }
        return partObj4;
      }
      default:
        return assertNever(part);
    }
  }

  const partWithKind = partParse(part);

  if (partWithKind.kind === 'basic') {
    return (
      <div>
        <b>{partWithKind.name} {partWithKind.exerciseCount}</b><br />
        <i>{partWithKind.description}</i><br />
        <br />
      </div>
    );
  } else if (partWithKind.kind === 'group') {
    return (
      <div>
        <b>{partWithKind.name} {partWithKind.exerciseCount}</b><br />
        <span>project exercises {partWithKind.groupProjectCount}</span><br />
        <br />
      </div>
    );
  } else if (partWithKind.kind === 'background') {
    return (
      <div>
        <b>{partWithKind.name} {partWithKind.exerciseCount}</b><br />
        <i>{partWithKind.description}</i><br />
        <span>submit to {partWithKind.backgroundMaterial}</span><br />
        <br />
      </div>
    );
  } else if (partWithKind.kind === 'special') {
    return (
      <div>
        <b>{partWithKind.name} {partWithKind.exerciseCount}</b><br />
        <i>{partWithKind.description}</i><br />
        <span>required skills: {partWithKind.requirements
        .map((r, index, reqs) => r[index] === r[reqs.length - 1] ? r : r + ', ')}
        </span><br />
        <br />
      </div>
    )
  }

  return (
    <div></div>
  );
};

export default Part;