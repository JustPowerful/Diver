exports.upload = async (req, res) => {
  // get the file name from the multer middleware
  const fileName = req.file.filename;
  // send back the file name
  res.json({
    success: true,
    message: "File uploaded successfully",
    document: fileName,
  });
};
