export function msToSeconds(time_in_ms: number) {
  return time_in_ms / 1000;
}

export function msToMinutes(time_in_ms: number) {
  return msToSeconds(time_in_ms) / 60;
}

export function msToHours(time_in_ms: number) {
  return msToMinutes(time_in_ms) / 60;
}

export function msToDays(time_in_ms: number) {
  return msToHours(time_in_ms) / 24;
}
