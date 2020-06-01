export function calcuateTimeDifferenceInMilliseconds(startTime: Date, endTime: Date): number {
  return endTime.getTime() - startTime.getTime()
}
