export const checkImage = (file) => {
    let err = "";
    if(!file){
        return err = "File does not exist.";
    }
//?1 mb
    if(file.size > 1024 * 1024){
         return (err = "File size must be less than 1 Mb.");
    }

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      return (err = "Image must be jpeg or png.");
    }

    return err;
}

export const imageUpload = async (images) => {
    let imgArr = [];
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadUrl = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;

    if (!uploadPreset || !cloudName || !uploadUrl) {
        throw new Error("Cloudinary upload environment variables are missing.");
    }

    for(const item of images){
        const formData = new FormData();

        if(item.camera){
            formData.append("file", item.camera);
        }else{
            formData.append("file", item);  
        }

        
        formData.append("upload_preset", uploadPreset);
        formData.append("cloud_name", cloudName);

        const res = await fetch(uploadUrl, {
            method: "POST",
            body: formData
        })

        const data = await res.json();
        imgArr.push({ public_id: data.public_id, url: data.secure_url });
        
      
    }
    return imgArr;
}
