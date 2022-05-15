using System.Threading.Tasks;
using API.Helpers;
using API.interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;

        public PhotoService(IOptions<CloudinarySettings> confing)
        {
            var acc = new Account(
                confing.Value.CloudName,
                confing.Value.ApiKey,
                confing.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }
        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);  //publicId is the photo's publicId
            var result =await _cloudinary.DestroyAsync(deleteParams);  //Delete the photo from Cloudinary
            return result;
        }

        public async Task<ImageUploadResult> UploadPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult(); //Create an empty ImageUploadResult

            if (file.Length > 0) {  //Check if the file is not empty
                using var stream = file.OpenReadStream(); //Open the file
                var uploadParams = new ImageUploadParams() //Create an ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream), //Set the file
                    Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face") //Set the transformation's parameters Photo
                };

                uploadResult = await _cloudinary.UploadAsync(uploadParams); //Upload the file to Cloudinary
            }
            return uploadResult;


        }
    }
}