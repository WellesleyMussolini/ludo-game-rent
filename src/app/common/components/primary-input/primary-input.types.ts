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
  placeholder: string;
  handleOnChange: (value: string) => void;
  handleOnSearch?: () => void;
}
