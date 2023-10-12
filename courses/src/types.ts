export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

export interface CourseName {
  courseName: string;
}

export interface TotalExercises {
  total: number;
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends CoursePartBaseWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartSpecial extends CoursePartBaseWithDescription {
  requirements: string[];
  kind: "special"
}
