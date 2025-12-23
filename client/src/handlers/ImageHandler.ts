type ImageType = {
    image: File;
}

class ImageHandler {
    private image: File;
    constructor ({image} : ImageType) {
        this.image = image;
    }

    public format (): Promise<string> {
        return new Promise((resolve) => {
            //PROMISE PALA TONG CLASS NATO BAT SA NORMAL JAVASCRIPT PWEDE I INSTANCIATE TO PA NORMAL
            const reader = new FileReader(); 
            
            reader.readAsDataURL(this.image);
            
            reader.onload = () => {
                resolve(String(reader.result));
            };

            reader.onerror = () => {
                resolve("Failed to format data");
            }
        });
    }
}

export default ImageHandler;