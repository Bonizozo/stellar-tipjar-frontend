export function formatUsername(username: string) {
  return username.startsWith("@") ? username : `@${username}`;
}

export function truncateMiddle(value: string, head = 4, tail = 4) {
  if (value.length <= head + tail) {
    return value;
  }

  return `${value.slice(0, head)}...${value.slice(-tail)}`;
}
export function formatNumber(value: number, decimals = 0): string {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(decimals) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(decimals) + 'K';
  }
  return value.toFixed(decimals);
}