import React, { useRef, ChangeEvent } from "react";
import imageCompression from "browser-image-compression";

type TabType = "Story" | "Flicks" | "Quest";

interface UploadContainerProps {
    onUpload: (file: File | File[]) => void;
    activeTab: TabType;
}

export const UploadContainer: React.FC<UploadContainerProps> = ({ onUpload, activeTab }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const compressImage = async (file: File): Promise<File> => {
        const options = {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
        };
        
        try {
            return await imageCompression(file, options);
        } catch (error) {
            console.error("Image compression error:", error);
            return file;
        }
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        let processedFiles: File[] = [];

        if (activeTab === "Story") {
            processedFiles = files.slice(0, 1);
        } else if (activeTab === "Flicks") {
            const imageFiles = files.filter(file => file.type.startsWith("image/"));
            const videoFiles = files.filter(file => file.type.startsWith("video/"));
            
            processedFiles = videoFiles.length > 0 
                ? videoFiles.slice(0, 1) 
                : imageFiles.slice(0, 14);
        }

        const compressedFiles = await Promise.all(
            processedFiles.map(async file => 
                file.type.startsWith("image/") ? compressImage(file) : file
            )
        );

        if (compressedFiles.length > 0) {
            onUpload(activeTab === "Flicks" ? compressedFiles : compressedFiles[0]);
        }
    };

    return (
        <div className="upload-outer-container">
            <div className="upload-container d-flex flex-column align-items-center justify-content-center">
                <div className="upload-icon-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-cloud-upload-fill upload-icon"></i>
                </div>
                <h3 className="upload-text">Upload your Content</h3>
                <p className="upload-subtext">
                    Drag your photos and videos with your followers
                </p>
                <input
                    type="file"
                    accept="image/*,video/*,.mp4,.mov,.avi,.wmv,.flv,.mkv,.webm,.heic,.heif"
                    className="d-none"
                    id="fileInput"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple={activeTab === "Flicks"}
                    aria-label="File upload"
                />
                <label htmlFor="fileInput" className="btn btn-primary select-files-button">
                    + Select Files
                </label>
            </div>
        </div>
    );
};
