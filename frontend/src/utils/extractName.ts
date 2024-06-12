export function extractFirstName(fullName: string | undefined): string {
  if (!fullName) {
    return "Not Found";
  } else {
    const names = fullName.split(" ");
    return names[0];
  }
}
