const fs = require("fs");
const path = require("path");
const textract = require("@nosferatu500/textract");
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const { stopwords } = require("natural");

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

async function calculateIDF(documents, queryTokens) {
  return documents.filter(async (doc) => {
    const content = await extractTextFromFile(
      path.join(__dirname, `../public/documents/${doc}`)
    );
    const contentTokens = tokenize(content);
    // Check if any term from the query appears in the document
    return queryTokens.some((term) => contentTokens.includes(term));
  }).length;
}

function tokenize(text) {
  const tokenized = tokenizer.tokenize(text);
  // stem the words
  const stemmer = natural.PorterStemmer;
  const stemmed = tokenized.map((word) => stemmer.stem(word));
  // remove stop words
  const filtered = stemmed.filter((word) => !stopwords.includes(word));
  return filtered;
}

exports.search = async (req, res) => {
  // get the documents from the file system
  const documents = fs.readdirSync(path.join(__dirname, "../public/documents"));
  // get the query from the request
  const query = req.query.search; // this may contain multiple words
  // tokenize the query
  const queryTokens = tokenize(query);
  // search the documents
  const results = await Promise.all(
    documents.map(async (document) => {
      const filePath = path.join(__dirname, `../public/documents/${document}`);
      // const content = fs.readFileSync(filePath, "utf8");
      const content = await extractTextFromFile(filePath);

      const contentTokens = tokenize(content);

      const intersection = contentTokens.filter((word) =>
        queryTokens.includes(word)
      );
      const tf = intersection.length / contentTokens.length;

      // sleep for 5 seconds
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      //calculate the number of documents where any term appears without using extractTextFromFile

      if (tf > 0) {
        const data = {
          document,
          score: intersection.length,
          tf: Number(tf.toFixed(3)),
          content: content,
          totalDocuments: documents.length,
          // idf: Number(idf.toFixed(3)),
          // tfidf: Number((tf * idf).toFixed(3)),
        };
        return data;
      }
    })
  );

  const filteredResults = results.filter((result) => result !== undefined);
  // sort the results
  // const sortedResults = filteredResults.sort((a, b) => b.score - a.score);
  // sort by tf
  const sortedResults = filteredResults.sort((a, b) => b.tf - a.tf);
  // return the results
  res.json(sortedResults);
};
