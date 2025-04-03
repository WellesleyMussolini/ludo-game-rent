export enum PrimaryInputTypes {
  SEARCH = "search",
  TEXT = "text",
  NUMBER = "number",
  EMAIL = "email",
  PASSWORD = "password",
  DATE = "date",
}

export interface IPrimaryInput {
  type: PrimaryInputTypes;
  text: string;
  label?: string;
  handleOnChange: (text: string) => void;
  placeholder?: string;
  handleOnSearch?: () => void;
  icon?: JSX.Element;
}
