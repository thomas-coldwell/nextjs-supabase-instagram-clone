export const handleFetchError = async (res: Response) => {
  let error = `Bad response from server, status: ${res.status}`;
  try {
    const payload = await res.json();
    error = payload.error;
  } catch (error) {
    // Do nothing
  }
  throw new Error(error);
};
