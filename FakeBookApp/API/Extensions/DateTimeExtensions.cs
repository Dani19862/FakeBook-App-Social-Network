using System;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        // this method is used to calculate the age of the user
        public static int CalculateAge(this DateTime dateOfBirth)
        {
            var age = DateTime.Today.Year - dateOfBirth.Year;
            if (dateOfBirth.AddYears(age) > DateTime.Today)
                age--;

            return age;
        }
        
        
    }
}