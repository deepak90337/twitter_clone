import React from 'react'
import '../pages.css'
import CumtomeLink from '../Sidebar/CumtomeLink';
import SidebarOptions from '../Sidebar/SidebarOptions';
import DeleteIcon from '@mui/icons-material/Delete';
import ShieldIcon from '@mui/icons-material/Shield';
import GroupAddIcon from '@mui/icons-material/GroupAdd';


function More() {
    return (
        <div className=''>
            {/* gave "page" class to above div and pageTitle to below h2*/}
            <h2 className='pageTitle' style={{marginTop:65}}>Welcome to More page</h2>
            <div className='sidebar'>
            <CumtomeLink to='/home/deletepost'>
        <SidebarOptions active Icon={DeleteIcon} text="Delete offensive post" />
      </CumtomeLink>
      <CumtomeLink to='/home/privacysetting'>
        <SidebarOptions active Icon={ShieldIcon} text="Privacy" />
      </CumtomeLink>
      <CumtomeLink to='/home/creategroup'>
        <SidebarOptions active Icon={GroupAddIcon} text="Create Group" />
      </CumtomeLink>
            </div>
    

        </div>
    )
}

export default More