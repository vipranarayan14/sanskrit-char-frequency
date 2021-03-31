const fs = require("fs");

const amarakoshaKanda1 = fs.readFileSync("amarakosha-1.txt", "utf-8");
const amarakoshaKanda2 = fs.readFileSync("amarakosha-2.txt", "utf-8");
const amarakoshaKanda3 = fs.readFileSync("amarakosha-3.txt", "utf-8");
const amarakoshaFull = "".concat(
  amarakoshaKanda1,
  amarakoshaKanda2,
  amarakoshaKanda3
);

const countChars = (chars) =>
  chars.reduce(
    (acc, char) => acc.set(char, (acc.get(char) || 0) + 1),
    new Map()
  );

const calcCharFreq = (str, ignoreChars) => {
  const chars = str.replace(new RegExp(ignoreChars, "g"), "").split("");
  const charsCounts = countChars(chars);
  return charsCounts;
};

const sortByFreq = (charsCounts) =>
  // Requires NodeJS >= 12
  Object.fromEntries([...charsCounts.entries()].sort((a, b) => b[1] - a[1]));

const ignoreChars = /[^\u0900-\u094D\u0962]/;

const amarakoshaCharFreq = [
  ["Amarakosha - Kanda 1", amarakoshaKanda1],
  ["Amarakosha - Kanda 2", amarakoshaKanda2],
  ["Amarakosha - Kanda 3", amarakoshaKanda3],
  ["Amarakosha - Full", amarakoshaFull],
].map(([name, data]) => ({
  part: name,
  freq: sortByFreq(calcCharFreq(data, ignoreChars)),
}));

fs.writeFileSync(
  "amarakosha_char_freq.json",
  JSON.stringify(amarakoshaCharFreq, null, 2)
);
