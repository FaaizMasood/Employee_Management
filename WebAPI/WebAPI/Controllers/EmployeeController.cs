using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;


namespace WebAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        // to Access the configuration from appsetting file we need to make use of dependency injection
        private readonly IConfiguration _configuration;
        // need one more dependecy injection to application path to folder
        private readonly IWebHostEnvironment _env;

        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        // lets add api method to get all department details - start
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select DepartmentId, EmployeeName, Department,
                    convert(varchar(10),DateOfJoining,120) as DateOfJoining
                    ,PhotoFileName
                    from dbo.Employee
                    ";
            DataTable table = new DataTable();
            // lets define variable to store the Db connection string
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        // lets add api method to get all department details - end

        //------------------------------------------------------------------------------------------//

        //lets add the post method to insert data - start
        [HttpPost]
        public JsonResult Post(Employee employee)
        {
            string query = @"insert into dbo.Employee
                                (EmployeeName,Department,DateOfJoining,PhotoFileName)
                                values
                                (
                                '" + employee.EmployeeName + @"'
                                ,'" + employee.Department + @"'
                                ,'" + employee.DateOfJoining + @"'
                                ,'" + employee.PhotoFileName + @"'
                                )
             ";
            DataTable table = new DataTable();
            // lets define variable to store the Db connection string
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }
        //lets add the post method to insert data - end

        //------------------------------------------------------------------------------------------//

        //lets add put method to update Data - Start
        [HttpPut]
        public JsonResult Put(Employee employee)
        {
            string query = @"update dbo.Employee set
                             EmployeeName = '" + employee.EmployeeName + @"'
                             ,Department = '" + employee.Department + @"'
                             ,DateOfJoining = '" + employee.DateOfJoining + @"'
                                where DepartmentId = " + employee.DepartmentId + @"
             ";
            DataTable table = new DataTable();
            // lets define variable to store the Db connection string
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }
        //lets add put method to update Data - end

        //------------------------------------------------------------------------------------------//

        //lets add delete method to delete Data - Start
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from dbo.Employee where DepartmentId = " + id + @" ";
            DataTable table = new DataTable();
            // lets define variable to store the Db connection string
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
        //lets add delete method to delete Data - end

        //------------------------------------------------------------------------------------------//

        //lets add method for photos - start 
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                // we will extract the first file that is attached here 
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos" + filename;
                // Save the file 
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anon.png"); 
            }
        }
        //lets add method for photos - end

        //------------------------------------------------------------------------------------------//

        //lets add method for dropdown of all department  - start 

        [Route("GetAllDepartmentNames")]
        public JsonResult GetAllDepartmentNames()
        {
            string query = @"
                    select DepartmentName from dbo.Department
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
        //lets add method for dropdown of all department  - end 
    }
}
