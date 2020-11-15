using System;
namespace WebAPI.Models
{
    public class Employee
    {
        // we will add the properties related to coloms
        public int EmployeeID { get; set; }
        public string EmplyeeName { get; set; }
        public string Department  { get; set; }
        public string DateOfJoining { get; set; }
        public string PhotoFileName { get; set; }

    }
}
