const textract = require("@nosferatu500/textract");
const fs = require("fs");
const path = require("path");
// read image.png
const filePath = path.join(__dirname, "/public/documents/coco.png");
const filePath2 = path.join(__dirname, "/public/documents/caca.png");
function extractTextFromFile(filePath) {
  return new Promise((resolve, reject) => {
    textract.fromFileWithPath(filePath, function (error, text) {
      if (error) {
        reject(error);
      } else {
        resolve(text);
      }
    });
  });
}
extractTextFromFile(filePath).then((text) => {
  console.log(text);
});
extractTextFromFile(filePath2).then((text) => {
  console.log(text);
});
