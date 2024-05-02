export const generateRandomGraphData = () => {
  let data = []
  for(var i = 0; i < 60;  i ++) {
    const random = Math.floor(Math.random() * 30) + 1;
    data.push({ value: random });
  }

  return data;
}