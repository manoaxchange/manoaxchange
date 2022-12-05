import axios from 'axios';

const postImage = async (imagefile) => {
  const response = await axios.post('/api/cloudinary/upload', {
    image: imagefile,
  });
  try {
    const data = response.data.secure_url;
    console.log('data from postImage():', data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default { postImage };
