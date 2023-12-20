export type WeekNumbers = [number, number, number, number, number, number, number]

export interface ParamsModel {
  exceptions: Record<string, number>,
  ini: string,
  end: string,
  z: number,
  dia: WeekNumbers,
  jove: 'on' | 'off'
  uni: 'on' | 'off'
}