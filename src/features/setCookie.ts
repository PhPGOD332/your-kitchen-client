export const setCookie = (name: string, value: string) => {
  document.cookie =
  encodeURIComponent(name) +
  "=" +
  encodeURIComponent(value);
  return document.cookie;
}