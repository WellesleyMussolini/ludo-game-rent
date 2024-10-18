export enum PrimaryInputTypes {
  SEARCH = "search",
  TEXT = "text",
  NUMBER = "number",
  EMAIL = "email",
  PASSWORD = "password",
}

export interface IPrimaryInput {
  type: PrimaryInputTypes;
  text: string;
  handleOnChange: (text: string) => void;
  placeholder: string;
  handleOnSearch?: () => void;
}
