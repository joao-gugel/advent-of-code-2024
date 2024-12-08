import fs from "fs";

function checkIsReportSafe(level: number[]): boolean {
  const checkRepeatedNumbersArr: number[] = [];

  for (let value of level) {
    if (checkRepeatedNumbersArr.includes(value)) return false;
    checkRepeatedNumbersArr.push(value);
  }

  let isIncreasing = false;
  let isDecreasing = false;

  for (let i in level) {
    const left = level[i];
    const right = level[+i + 1];

    if (left < right) isIncreasing = true;
    if (right < left) isDecreasing = true;

    if (isDecreasing && isIncreasing) return false;
    if (!isDecreasing && !isIncreasing) return false;

    const difference = Math.abs(left - right);

    if (difference > 3 || difference < 1) return false;
  }

  return true;
}

function checkIsRemovedSingleLevelSafe(level: number[]): boolean {
  let newReport = [];

  for (let i in level) {
    newReport = [...level];
    newReport.splice(+i, 1);

    if (checkIsReportSafe(newReport)) {
      return true;
    }
  }

  return false;
}

function puzzleTwo(): void {
  const file = fs.readFileSync(__dirname + "/p-input.txt", "utf-8");

  const reports = file.split("\n");
  const reportsAndLeves = reports.map((report) =>
    report.split(" ").map((v) => +v)
  );

  let safeReportsQty = 0;
  const unsafeReports: number[][] = [];

  for (let levels of reportsAndLeves) {
    const isSafe = checkIsReportSafe(levels);
    if (!isSafe) unsafeReports.push(levels);
    else safeReportsQty++;
  }

  console.log("First Answer:", safeReportsQty);

  let safeReportsAfterSingleLevelCheck = 0;

  for (let levels of unsafeReports) {
    const isSafe = checkIsRemovedSingleLevelSafe(levels);
    if (isSafe) safeReportsAfterSingleLevelCheck++;
  }

  console.log(
    "Second answer:",
    safeReportsAfterSingleLevelCheck + safeReportsQty
  );
}

puzzleTwo();
