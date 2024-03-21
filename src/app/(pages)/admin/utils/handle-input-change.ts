import { iGameApiData } from "../interfaces/game-api-data.interface";

export const handleInputChange = (event: string, field: string, handeOnChange: (value: React.SetStateAction<iGameApiData>) => void) => {
    handeOnChange((prevState) => ({ ...prevState, [field]: event }));
};