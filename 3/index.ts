import fs from "fs";

function multipliesResult(multiples: string[]) {
  let resultAc = 0;

  for (let multiply of multiples) {
    const parenthesisParams = multiply.slice(
      multiply.indexOf("("),
      multiply.indexOf(")", multiples.indexOf("(")) + 1
    );

    const numbersParams = parenthesisParams.replace(/[(),]/g, "");

    if (isNaN(numbersParams as any)) continue;

    let isSecondParam = false;

    let firstParams = "";
    let secondParams = "";

    for (let digit of multiply) {
      if (digit === ",") isSecondParam = true;
      if (!isNaN(digit as any)) {
        if (isSecondParam) secondParams += digit;
        else firstParams += digit;
      }
    }

    const res = Number(firstParams) * Number(secondParams);

    if (!isNaN(res)) resultAc += res;
  }

  return resultAc;
}

function getValidMultiplications(text: string) {
  const multiplications: string[] = [];

  let startMul = text.indexOf("mul(");
  let endsMul = text.indexOf(")", startMul);

  while (startMul !== -1 && endsMul !== -1) {
    let mul = text.slice(startMul, endsMul + 1);

    let secondStartMul = mul.indexOf("mul(", 1);
    let hasSecondStartMul = secondStartMul !== -1;

    if (hasSecondStartMul) mul = mul.slice(secondStartMul, endsMul + 1);

    if (mul) multiplications.push(mul);

    startMul = text.indexOf("mul(", endsMul);
    endsMul = text.indexOf(")", startMul);
  }

  return multiplications;
}

function getValidDoMultiplications(text: string) {
  let firstEndsDo = text.indexOf("don't()");

  let doString = text.slice(0, firstEndsDo);

  let startDo = text.indexOf("do()");
  let endsDo = text.indexOf("don't()", startDo);

  while (startDo !== -1 && endsDo !== -1) {
    let mults = text.slice(startDo, endsDo + 1);

    if (mults) doString += mults;

    startDo = text.indexOf("do()", endsDo);
    endsDo = text.indexOf("don't()", startDo);
  }

  return doString;
}

function puzzleThree(): void {
  let file = fs.readFileSync(__dirname + "/p-input.txt", "utf-8");

  const multiplications = getValidMultiplications(file);
  const result = multipliesResult(multiplications);
  console.log("First answer", result);

  const getDoMult = getValidDoMultiplications(file);
  const doMultiplications = getValidMultiplications(getDoMult);
  const result2 = multipliesResult(doMultiplications);
  console.log("Second answer", result2);
}

puzzleThree();
