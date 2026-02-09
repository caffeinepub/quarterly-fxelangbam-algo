export function maskAccountName(name: string): string {
  if (name.length <= 4) {
    return name.charAt(0) + '*'.repeat(name.length - 1);
  }

  const firstTwo = name.substring(0, 2);
  const lastTwo = name.substring(name.length - 2);
  const middleLength = name.length - 4;
  const masked = firstTwo + '*'.repeat(Math.max(middleLength, 3)) + lastTwo;

  return masked;
}
