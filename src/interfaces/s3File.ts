interface S3File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: any;
  storageClass: string;
  serverSideEncryption: any;
  metadata: any;
  location: string;
  etag: string;
  versionId: any;
}

export default S3File;
