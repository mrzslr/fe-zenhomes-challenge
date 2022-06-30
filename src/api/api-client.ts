export const ApiClient = {
  get: async (url: string): Promise<any> => {
    const response: Response = await fetch(url);
    const data: Promise<any> = await response.json();
    return data;
  }
};
