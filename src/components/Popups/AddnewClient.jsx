import React from 'react'
import {
    XCircleIcon
} from '@heroicons/react/24/outline'

function AddnewClient({ visible, close }) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">

            <div className='w-[1000px] h-[85%] overflow-y-scroll bg-bg rounded-md'>


                <div className='sticky top-0 backdrop-blur-sm bg-bg bg-opacity-20'>
                    <div className='flex justify-between px-20 pt-5 pb-2'>
                        <h1 className='heading'>Add New Client</h1>
                        <XCircleIcon onClick={() => close(false)} className="w-8" />
                    </div>
                </div>

                <div className='px-28 pb-20 w-[950px]'>

                    <form>

                        <div className='flex flex-col'>
                            <label className='label'>Client Name</label>
                            <input className='NewEmployeeinput' type="text" name="employee_name" />
                        </div>

                        <div className='flex justify-between py-3'>

                            <div className='flex flex-col'>
                                <label className='label'>Email</label>
                                <input className='NewEmployeeinput w-[300px]' type="email" name="employee_name" />
                            </div>
                            <div className='flex flex-col'>
                                <label className='label'>Mobile No</label>
                                <input className='NewEmployeeinput w-[300px]' type="tel" name="employee_name" />
                            </div>

                        </div>

                        <div className='flex flex-col'>
                            <label className='label'>City</label>
                            <input className='NewEmployeeinput' type="text" name="employee_name" />
                        </div>

                        <div className='flex flex-col'>
                            <label className='label'>Company/Ind</label>
                            <input className='NewEmployeeinput' type="text" name="employee_name" />
                        </div>

                        <div className='flex flex-col'>
                            <label className='label'>Address</label>
                            <textarea className='NewEmployeeinput h-[100px]' type="text" name="employee_name" ></textarea>
                        </div>

                        <div>
                            <button className='py-2 px-6 mt-10 bg-green-500 text-white font-medium rounded-md shadow-sm '>Submit</button>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default AddnewClient