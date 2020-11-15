using System;
namespace WebAPI.Models
{
    public class Department
    {
        // sice we have two coloumns we need two properties
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }
}
