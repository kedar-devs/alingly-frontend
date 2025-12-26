// utils/s3MultipartUpload.ts

interface MultipartUploadConfig {
    file: File;
    chunkSize?: number; // Default 5MB
    onProgress?: (progress: number) => void;
  }
  
  interface UploadPart {
    partNumber: number;
    etag: string;
  }
  
  export class S3MultipartUploader {
    private chunkSize: number;
    private file: File;
    private onProgress?: (progress: number) => void;
  
    constructor(config: MultipartUploadConfig) {
      this.file = config.file;
      this.chunkSize = config.chunkSize || 5 * 1024 * 1024; // 5MB default
      this.onProgress = config.onProgress;
    }
  
    // Split file into chunks
    private splitFileIntoChunks(): Blob[] {
      const chunks: Blob[] = [];
      let start = 0;
      
      while (start < this.file.size) {
        const end = Math.min(start + this.chunkSize, this.file.size);
        chunks.push(this.file.slice(start, end));
        start = end;
      }
      
      return chunks;
    }
  
    async upload(): Promise<string> {
      const chunks = this.splitFileIntoChunks();
      const totalChunks = chunks.length;
  
      // Step 1: Initialize multipart upload
      const initResponse = await fetch('/api/v1/file-upload/initiate-multipart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_name: this.file.name,
          content_type: this.file.type,
          file_size: this.file.size
        })
      });
      
      const { upload_id, file_key } = await initResponse.json();
  
      // Step 2: Upload each chunk in parallel
      const uploadPromises = chunks.map(async (chunk, index) => {
        const partNumber = index + 1;
        
        // Get presigned URL for this chunk
        const urlResponse = await fetch('/api/v1/file-upload/get-part-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file_key,
            upload_id,
            part_number: partNumber,
            total_parts: totalChunks
          })
        });
        
        const { upload_url } = await urlResponse.json();
  
        // Upload chunk to S3
        const uploadResponse = await fetch(upload_url, {
          method: 'PUT',
          body: chunk,
          headers: {
            'Content-Type': this.file.type
          }
        });
  
        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload part ${partNumber}`);
        }
  
        // Get ETag from response headers (required for completion)
        const etag = uploadResponse.headers.get('ETag')?.replace(/"/g, '');
        
        if (!etag) {
          throw new Error(`No ETag received for part ${partNumber}`);
        }
  
        // Report progress
        if (this.onProgress) {
          this.onProgress(((partNumber / totalChunks) * 100));
        }
  
        return {
          PartNumber: partNumber,
          ETag: etag
        };
      });
  
      // Wait for all chunks to upload
      const parts = await Promise.all(uploadPromises);
  
      // Step 3: Complete multipart upload
      const completeResponse = await fetch('/api/v1/file-upload/complete-multipart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_key,
          upload_id,
          parts: parts
        })
      });
  
      const { file_url } = await completeResponse.json();
      return file_url;
    }
  }
  
  // Usage in your component
  export const uploadLargeFile = async (
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<string> => {
    const uploader = new S3MultipartUploader({
      file,
      chunkSize: 5 * 1024 * 1024, // 5MB chunks
      onProgress
    });
    
    return await uploader.upload();
  };