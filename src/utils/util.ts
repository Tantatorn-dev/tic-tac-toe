export const posToArrIndex = (x: number, y: number) => x + y * 3;

export const arrIndexToPos = (index: number) => {
  return {
    x: index % 3,
    y: Math.floor(index / 3),
  };
};
