import AWS from 'aws-sdk';
import { useState } from 'react';
import { useCreateImageInfoMutation, useGetImageInfoQuery, useUpdateImageInfoMutation } from '../../main/apiSlice';
import { useSelector } from 'react-redux';
import { width } from '@mui/system';



export default function ImageUploader({ imageType }) {
  const [imageUrl, setImageUrl] = useState(null);
  const user = useSelector(state => state.userReducer.user);
  const [createImageInfo] = useCreateImageInfoMutation()
  const [updateImageInfo] = useUpdateImageInfoMutation()
  const { data: imageInfo, isLoading: isLoadingInfo } = useGetImageInfoQuery(user.id)

  const [image, setImage] = useState(null);


  const handleFileSelect = (e) => {
    setImage(e.target.files[0]);
  }

  const handleUpload = async () => {
    if (!image) {
      return;
    }

  const formData = new FormData();
  formData.append('profile', image);

  console.log('Uploading image:', image);

    if (imageInfo == null) {
      if (imageType === 'profile') createImageInfo({ profileId: user.id, profileImageUrl: imageUrl  }).unwrap().then(response => console.log(response))
      if (imageType === 'header') createImageInfo({ profileId: user.id, headerImageUrl: imageUrl }).unwrap().then(response => console.log(response))

    } else {
      if (imageType === 'profile') updateImageInfo({ id: imageInfo.id, profileId: user.id, profileImageUrl: imageUrl , headerImageUrl: imageInfo?.headerImageUrl }).unwrap().then(response => console.log(response))
      if (imageType === 'header') updateImageInfo({ id: imageInfo.id, profileId: user.id, profileImageUrl: imageInfo?.profileImageUrl, headerImageUrl: imageUrl  }).unwrap().then(response => console.log(response))

    }
    setImageUrl(URL.createObjectURL(image));

  }

  return (
    <div>
      <input type="file"  accept="image/*" onChange={handleFileSelect} />
      {image && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
      {imageUrl && (
        <div style={{ marginTop: '10px', width: '200px' }}>
          <img src={imageUrl} alt="uploaded" />
        </div>
      )}

    </div>
  );
}