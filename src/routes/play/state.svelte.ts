export const inputStrokes: Array<Array<[number, number]>> = $state([[]]);

export function addPoint(point: [number, number]): void {
  inputStrokes[inputStrokes.length - 1].push(point);
}

export function newStroke(): void {
  if(inputStrokes[inputStrokes.length - 1].length) {
    inputStrokes.push([])
  }
}