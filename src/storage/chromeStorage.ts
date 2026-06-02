export const saveToStorage = async (
  key: string,
  value: unknown
) => {
  await chrome.storage.local.set({
    [key]: value,
  });
};

export const getFromStorage = async (
  key: string
) => {
  const result =
    await chrome.storage.local.get(key);

  return result[key];
};