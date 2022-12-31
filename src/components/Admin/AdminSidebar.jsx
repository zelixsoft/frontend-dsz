import { useState } from 'react'
import SidebarOption from '../SidebarOption';
import {
    UserCircleIcon,
    Squares2X2Icon,
    CubeIcon,
    ServerStackIcon,
    BellIcon,
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function AdminSidebar() {

    const navigate = useNavigate();
    const [Panel, setPanel] = useState("Admin Panel")
    const User = useSelector((state) => state.user.user);


    const HandelPanelSelection = (e) => {
        var val = e.target.value;

        if (val === "Employee") {
            navigate('/employee');
            setPanel("Employee");

        } if (val === "Hr") {
            navigate('/hr');
            setPanel("Hr Department");
        }
        console.log(val);
    }

    return (
        <div className='basis-[17%]  h-screen'>

            {/* Employee details */}

            <div className='p-2 m-2 mt-7 flex items-center justify-center'>

                <div className='flex items-center'>
                    <div className='w-9 h-9 bg-indigo-100 outline outline-primary outline-2 rounded-md p-1 mx-1'>
                        <UserCircleIcon className='stroke-primary' />
                    </div>
                    <div className='mx-2'>
                        <h1 className='text-md font-medium'>{User.employee_name}</h1>
                        <p className='text-sm text-gray-400'>{User.employee_office_email}</p>
                    </div>

                </div>

            </div>

            <hr className='mx-auto my-2 w-[60%] bg-primary h-[2px]' />


            <div className='mt-10 p-2 px-4'>
                <div>
                    <select id="panel" name="panel" className='bg-gray-50 w-full p-2.5 outline-none border-blue-500  focus:ring-blue-500 rounded-md text-sm focus:border-blue-500 block hover:cursor-pointer' onChange={(e) => { HandelPanelSelection(e) }} defaultValue={Panel}>
                        <option value="Select Option" hidden selected >Admin Panel</option>
                        <option className='tetx-sm' value="Employee">Employee</option>
                        <option className='tetx-sm' value="Hr">Hr Department</option>
                    </select>
                </div>
            </div>


            <div className='mt-10'>
                <SidebarOption link={"dashbord"} Icon={Squares2X2Icon} Title={"DashBoard"} />
                <SidebarOption link={"products"} Icon={CubeIcon} Title={"Products"} />
                <SidebarOption link={"ipsetup"} Icon={ServerStackIcon} Title={"Ip SetUp"} />
                <SidebarOption link={"notification"} Icon={BellIcon} Title={"notification"} />
            </div>

        </div>
    )
}

export default AdminSidebar