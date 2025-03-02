const Constants = require("./Constants")
const { v4: uuidv4 } = require('uuid');
const fs = require("fs")
const path = require("path")

class FileSaver {

    /*const imageByteArray = iMessage.imageBlob
            const imageBuffer = Buffer.from(imageByteArray, 'base64')
            const imageFolderPath = process.cwd()
            const asd = imageFolderPath + "/images"
            const imageFilePath = path.join(asd, 'image.JPEG')
            fs.writeFileSync(imageFilePath, imageBuffer)*/

    saveImage = async(imageByteArray, uuId, conversationId) => {

        const imageFormat = ".JPEG"
        const uniqueImageName =  `${uuId}_${conversationId}_${Math.floor(Date.now() / 1000)}` + imageFormat
        const imageBuffer = Buffer.from(imageByteArray, "binary")
        const imageFilePath = path.join(Constants.imagePath, uniqueImageName)
        fs.writeFileSync(imageFilePath, imageBuffer)
        console.log("The image successfully created.")
        return uniqueImageName
        /*const uniqueImageName = imageName + uuidv4() + ".JPEG"
        const imageBuffer = Buffer.from(imageByteArray, "binary")
        const imageFilePath = path.join(Constants.imagePath, uniqueImageName)
        fs.writeFileSync(imageFilePath, imageBuffer)
        return uniqueImageName*/
    }

    deleteImage = async (imageName) => {
        fs.unlinkSync(path.join(Constants.imagePath, imageName), (error) => {
            if(error)
                throw error
            console.log("The image successfully deleted.")
        })
    }
}

module.exports = new FileSaver