import { useState, useEffect } from 'react'
import {
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline'
import { usePopups } from '../PopupsContext';
import EditEmployeeDetails from '../Popups/EditEmployeeDetails';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fechEmployees } from '../../Reducer/employeeSlice';


function StaffSidebar() {

  const dispatch = useDispatch();
  const { employee } = usePopups();
  const [EditStaffDetails, SetEditStaffDetails] = employee;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const EmployeeId = useSelector((state) => state.employee.employeeId)
  const Employees = useSelector((state) => state.employee.employees);

  const [BankDetails, setBankDetails] = useState({})

  useEffect(() => {

    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_HOST}/api/employee/bankinfo/` + EmployeeId,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', withCredentials: true,
    };

    // console.log(config.url)
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var resData = response.data;
        if (resData.error) {
          // console.log(resData.errorMessage);
          setBankDetails({});
        } else {
          setBankDetails(resData.data);
        }
      })
      .catch(function (error) {
        // console.log(error);
        setBankDetails({});
      });

  }, [EmployeeId])


  const HandelDeleteEmployee = () => {

    var data = JSON.stringify({
      "data": {
        "employee_relieve_date": yyyy + "-" + mm + "-" + dd,
      }
    });

    var config = {
      method: 'delete',
      url: `${process.env.REACT_APP_HOST}/api/employee/${EmployeeId}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        var resdata = response.data;

        if (resdata.error) {

          Store.addNotification({
            title: "Error While Removing Employee",
            message: resdata.errorMessage,
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });

        } else {

          Store.addNotification({
            title: "Employee Removed Successfully",
            message: "Success",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });

          dispatch(fechEmployees());


        }
      })
      .catch(function (error) {
        // console.log(error);
        var result = error.response.data;

        // console.log(result);

        if (result) {
          if (result.error) {

            Store.addNotification({
              title: result.errorType ? result.errorType : "Error!",
              message: result.errorMessage ? result.errorMessage : "Error While Processing Request!",
              type: "warning",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true
              }
            });
          }


        }
      });

  }


  if (!EmployeeId || !Employees) {
    return <div className='flex justify-center items-center text-blue-500 pt-20'>Loading Employees...</div>
  }

  const Employee = Employees.filter((obj) => {
    return obj.employee_id === parseInt(EmployeeId);
  })

  const Data = Employee[0];

  // console.log(Data)

  if (!Data) {
    return <div className='flex justify-center items-center text-blue-500 pt-20'>Loading Employees...</div>
  }


  return (
    <div className='mx-6 mt-10 pb-40 flex flex-col text-[14px] text-black md:pb-0'>

      <div>

        <span className='flex items-center justify-between'>
          <h1 className="headline">{Data.employee_name}</h1>
          <div className='group relative' >
            <p className='w-5 mr-3 hover:cursor-pointer'><EllipsisVerticalIcon /> </p>
            <div className='hidden group-hover:block absolute top-2 right-3 bg-white shadow-md rounded-sm w-[150px]'>
              <div className='py-1'>
                <li className='hover:bg-blue-400 hover:text-white hover:cursor-pointer list-none px-2' onClick={() => HandelDeleteEmployee()}>Delete Employee</li>
              </div>
            </div>
          </div>
        </span>

        <div className='pt-2 text-gray-400'>
          <p>{Data.employee_email}</p>
          <p>{Data.employee_mobile}</p>
        </div>

      </div>


      <hr className='mx-auto my-4 mb-3 w-[60%] bg-indigo-500 h-[2px]' />



      <div className=''>

        {/* section No 2 */}

        <div className='pb-1 mt-7'>

          <div className='flex justify-between w-[90%] py-2'>
            <div>
              <h1 className='text-gray-400'>Date of Joinonig</h1>
              <p>{Data.employee_doj}</p>
            </div>

            <div>
              <h1 className='text-gray-400'>Relieve Date</h1>
              <p>--</p>
            </div>
          </div>

          <div className='pt-2'>
            <h1 className='text-gray-400'>Office Mail</h1>
            <p className='text-black'>{Data.employee_office_email}</p>
          </div>

        </div>

        {/* section no 3 */}

        <hr className='mx-auto my-3 w-[60%] bg-indigo-500 h-[2px]' />

        <div className='mt-7'>
          <div className='flex justify-between w-[90%] py-2'>
            <div>
              <h1 className='text-gray-400'>DOB</h1>
              <p>{Data.employee_dob}</p>
            </div>

            <div>
              <h1 className='text-gray-400'>Mobile No</h1>
              <p>{Data.employee_mobile}</p>
            </div>
          </div>

          <div className='pt-2'>
            <h1 className='text-gray-400'>Email</h1>
            <p className='text-black'>{Data.employee_email}</p>
          </div>

          <div className='py-2'>
            <h1 className='text-gray-400'>Address</h1>
            <p className='text-black pr-4'>{Data.employee_address}</p>
          </div>
        </div>



        <hr className='mx-auto my-3 w-[60%] bg-indigo-500 h-[2px]' />

        <div className='mt-7 mb-8'>

          <div className='py-1'>
            <h1 className='text-gray-400'>Name (Given in Bank)</h1>
            <p className='text-black'>{BankDetails.employee_name_as_in_bank}</p>
          </div>

          <div className='py-1'>
            <h1 className='text-gray-400'>Bank Name</h1>
            <p className='text-black'>{BankDetails.bank_info_name}</p>
          </div>

          <div className='py-1'>
            <h1 className='text-gray-400'>Branch Name</h1>
            <p className='text-black'>{BankDetails.bank_info_branch_name}</p>
          </div>

          <div className='py-1'>
            <h1 className='text-gray-400'>Account No</h1>
            <p className='text-black'>{BankDetails.bank_account_no}</p>
          </div>
          <div className='py-1'>
            <h1 className='text-gray-400'>IFSC Code</h1>
            <p className='text-black'>{BankDetails.bank_info_ifsc_code}</p>
          </div>
        </div>

      </div>

      <div className='my-6 mx-auto text-[14px]'>

        <button className='px-4 py-2 w-[95%] mx-auto bg-primary text-white font-medium rounded-md shadow-md' onClick={() => { SetEditStaffDetails(true) }} >Edit</button>

      </div>

      <EditEmployeeDetails visible={EditStaffDetails} close={SetEditStaffDetails} Employee={Data} Employee_Bank_info={BankDetails} />


    </div>
  )
}

export default StaffSidebar