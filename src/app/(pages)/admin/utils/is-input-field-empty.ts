import { iGameApiData } from "../interfaces/game-api-data.interface";

export const isInputFieldEmpty = (event: keyof iGameApiData, defaultValue: string, gameApiData: iGameApiData) => gameApiData[event].trim() !== "" ? gameApiData[event] : defaultValue;