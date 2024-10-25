// STROKES
export const inputStrokes: Array<Array<[number, number]>> = $state([[]]);

export function addPoint(point: [number, number]): void {
  inputStrokes[inputStrokes.length - 1].push(point);
}

export function newStroke(): void {
  if(inputStrokes[inputStrokes.length - 1].length) {
    inputStrokes.push([])
  }
}

// INFORMATION
type Cursor = {
  x: number | undefined,
  y: number | undefined
}

type Information = {
  score: number,
  handedness: "left" | "right" | undefined,
  cursor: Cursor,
  cursorHistory: Cursor[]
}

export const information: Information = $state({
  score: 0,
  handedness: undefined,
  cursor: {
    x: undefined,
    y: undefined
  },
  cursorHistory: new Array(12).fill({x: undefined, y: undefined})
})

export function addPointToHistory(point: Cursor): void {
  information.cursorHistory.unshift(point);
  information.cursorHistory.pop();
}