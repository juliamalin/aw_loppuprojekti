import AWS from 'aws-sdk';
import { useState } from 'react';



AWS.config.update({
  accessKeyId: 'AKIA5T564YYYPJWIH6AU',
  secretAccessKey: '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',
  region: 'eu-north-1',
  signatureVersion: 'v4',
});

export default function ImageUploader() {
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  }
  const uploadToS3 = async () => {
    if (!file) {
      return;
    }
    const params = {
      Bucket: 'taskappbucket',
      Key: `${Date.now()}.${file.name}`,
      Body: file
    };
    const { Location } = await s3.upload(params).promise();
    console.log('Image at', Location)
    setImageUrl(Location);
    console.log('uploading to s3', Location);
  }

  const params2 = {
    Bucket: 'taskappbucket',
    MaxKeys: 2
  }
  s3.listObjects(params2, function (err, data) {
    if (err) console.log(err, err.stack)
    else console.log(data)
  })

  return (
    <div style={{ marginTop: '150px' }}>
      <h1>Test Image Upload</h1>
      <input type="file" onChange={handleFileSelect} />
      {file && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={uploadToS3}>Upload</button>
        </div>
      )}
      {imageUrl && (
        <div style={{ marginTop: '10px' }}>
          <img src={imageUrl} alt="uploaded" />
        </div>
      )}
    </div>
  );
}