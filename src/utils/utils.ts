export const determineIdentifierType = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (emailRegex.test(value)) return "email";
    if (phoneRegex.test(value)) return "phone";
    return "username";
  };

export const handleUploadToPresignedUrl = async (file: File, presignedUrl: string) => {
  const uploadResponse = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });
  if (!uploadResponse.ok) {
    throw new Error("Failed to upload file");
  }
  return uploadResponse.url
};


