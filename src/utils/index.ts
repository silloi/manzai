export const isObject = (value: unknown) => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const eliminateFirstLetter = (str: string) => {
  return str.slice(1);
}

export const eliminateLastLetter = (str: string) => {
  return str.slice(0, str.length - 1);
}
