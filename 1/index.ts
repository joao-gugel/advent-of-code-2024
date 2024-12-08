import fs from "fs";

function puzzleOne() {
  const file = fs.readFileSync(__dirname + "/p-input.txt", "utf-8");

  const numbers = file.split("\n");

  let numbersLeft: number[] = [];
  let numbersRight: number[] = [];

  numbers.forEach((numberLine) => {
    const [left, right] = numberLine.split(/\s+/);
    numbersLeft.push(+left);
    numbersRight.push(+right);
  });

  const leftSorted = numbersLeft.sort((a, b) => a - b);
  const rightSorted = numbersRight.sort((a, b) => a - b);

  let distanceAc = 0;

  for (let i in rightSorted) {
    if (rightSorted[i] > leftSorted[i])
      distanceAc += rightSorted[i] - leftSorted[i];
    else distanceAc += leftSorted[i] - rightSorted[i];
  }

  // First answer
  console.log("First answer:", distanceAc);

  const numbersMap: {
    [key: string]: number;
  } = {};

  for (let i in leftSorted) {
    const actualNumber = leftSorted[i];

    for (let j in rightSorted) {
      if (rightSorted[j] === actualNumber) {
        if (numbersMap[actualNumber]) numbersMap[actualNumber] += 1;
        else numbersMap[actualNumber] = 1;
      }
    }
  }

  let totalAppearedAc = 0;

  const mapKeys = Object.keys(numbersMap);

  for (let key of mapKeys) {
    totalAppearedAc += +key * numbersMap[key];
  }

  // Second answer
  console.log("Second answer:", totalAppearedAc);
}

puzzleOne();
