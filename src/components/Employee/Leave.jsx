import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function Leave() {

  var date = new Date();
  var minDate = new Date(date.getTime() + 48 * 60 * 60 * 1000);
  var dd = String(minDate.getDate()).padStart(2, '0');
  var mm = String(minDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = minDate.getFullYear();
  minDate = yyyy + '-' + mm + '-' + dd;

  // console.log(minDate);

  const EmployeeId = useSelector((state) => state.user.employeeId)


  const [LeaveData, setLeaveData] = useState({
    "leave_req_start_date": "",
    "leave_req_end_date": "",
    "employee_id": EmployeeId,
    "leave_req_message": ""
  })

  const HandelInput = (e) => {
    var field = e.target.name;
    var val = e.target.value;

    var preData = { ...LeaveData };
    preData[field] = val;
    setLeaveData(preData);
  }

  const HandelLeaveSubmit = () => {

    console.log("leve req")

    var data = JSON.stringify({
      "data": LeaveData
    });

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_HOST}/api/auth/attendance/leave`,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      withCredentials: true,
      data: data
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));

        var resdata = response.data;
        if (resdata.error) {

          // var errordata = errorMessages[resdata.errorMessage];

          Store.addNotification({
            title: resdata.errorType,
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
            title: "Request Sended Successfully",
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

        }
      })
      .catch(function (error) {
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

  return (
    <div className='basis-[100%] md:basis-[83%] bg-bg overflow-y-scroll h-screen'>
      <div className='ml-5 py-5 md:ml-10 md:py-10'>
        <h1>Request For Leave</h1>

        <div className='mr-2 md:mr-0 md:mt-6'>
          <div className='flex flex-col md:flex-row md:justify-start py-2'>
            <div className='flex flex-col'>
              <label className='label'>Start Data</label>
              <input className='outline-none px-2 py-1 md:py-0 bg-white' type="date" name='leave_req_start_date' value={LeaveData.leave_req_start_date} onChange={(e) => { HandelInput(e) }} min={minDate} />
            </div>
            <div className='md:ml-4 flex flex-col'>
              <label className='label'>End Data</label>
              <input className='outline-none px-2 py-1 md:py-0 bg-white' type="date" name='leave_req_end_date' value={LeaveData.leave_req_end_date} onChange={(e) => { HandelInput(e) }} min={minDate} />
            </div>
          </div>
          <div className='flex flex-col py-2 '>
            <label className='label'>Message</label>
            <textarea className='md:w-[50%] h-[80px] outline-none rounded-sm py-1 px-2' name='leave_req_message' value={LeaveData.leave_req_message} onChange={(e) => { HandelInput(e) }} ></textarea>
          </div>
          <div className='py-2'>
            <button className='py-2 px-6 bg-green-500 text-white font-medium rounded-md shadow-sm' onClick={() => { HandelLeaveSubmit() }}>Submit</button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Leave