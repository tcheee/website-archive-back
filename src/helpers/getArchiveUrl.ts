export default function getArchiveUrl(string): string {
  const regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const archiveUrl = string.match(regex);
  return archiveUrl ? archiveUrl[0] : null;
}
