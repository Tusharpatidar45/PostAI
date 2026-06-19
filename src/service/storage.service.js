const { ImageKit, toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, filename) {
  const response = await client.files.upload({
    file: await toFile(file, filename),
    fileName: filename,
    folder: "POST-AI",
  });

  return response;
}

module.exports = uploadFile;
