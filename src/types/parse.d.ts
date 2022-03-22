export type ParsedText = {
  header: { [key: string]: string | object },
  contents: Content[],
};

export type Content = {
  type?: number,
  name?: string,
  message?: string,
};
