import axios from 'axios';

const pinataApiKey = 'df1b1534f836ff059629';
const pinataSecretApiKey = '5585c2c9137f26fe077a20b015e14255132df4db4ca760ae9da9d03112ba7239';

export const uploadToPinata = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  let data = new FormData();
  data.append('file', file);

  const metadata = JSON.stringify({
    name: file.name,
  });
  data.append('pinataMetadata', metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  data.append('pinataOptions', options);

  try {
    const response = await axios.post(url, data, {
      maxContentLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file to Pinata:', error);
    throw error;
  }
};
