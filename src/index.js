const path = require("path");
const fs = require("fs");

const directoryPath = path.join(__dirname, "..", "resources", "meters");

async function quickstart(file) {
  // Imports the Google Cloud client library
  const vision = require("@google-cloud/vision");

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.documentTextDetection(
    path.join(directoryPath, file)
  );
  // const labels = result.fullTextAnnotation;
  console.log(`\nRead-like values in "${file}":`);
  console.log(
    result.fullTextAnnotation.text
      .split("\n")
      .filter((line) => /^\d+\.\d+$/.test(line))
  );
  console.log(
    "Confidences (TODO extract correct ones for read-like value characters):"
  );
  console.log(
    result.fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words[0]
      .symbols[3]
  );
  // console.log(
  //   result.fullTextAnnotation.pages[0].blocks[0].boundingBox.vertices[0]
  // );
  // console.log(result.fullTextAnnotation.pages[0].boundingBox.vertices);
  // console.log(JSON.stringify(result, null, 4));
  // labels.text.forEach((label) => console.log(label.description));
}

fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    quickstart(file);
  });
});

// async function quickstart() {
//   // Imports the Google Cloud client library
//   const vision = require("@google-cloud/vision");

//   // Creates a client
//   const client = new vision.ImageAnnotatorClient();

//   // Performs label detection on the image file
//   const [result] = await client.labelDetection("./resources/wakeupcat.jpg");
//   const labels = result.labelAnnotations;
//   console.log("Labels:");
//   labels.forEach((label) => console.log(label.description));
// }
// quickstart();
