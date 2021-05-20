export const calculateBMI = (weight: number, height: number): number => {
  // 身長の単位 cm → m
  const formattedHeight = height / 100;
  const calcValue = weight / Math.pow(formattedHeight, 2);

  // 少数２桁切り捨てで返す
  return Math.floor(calcValue * 100) / 100;
};
