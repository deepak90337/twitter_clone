import React,{useEffect} from 'react'
import { Avatar } from "@mui/material";


function ShowUserProfile(u) {
   const {name,email,profileImage  } = u.u;
  

   useEffect(() => {
    console.log("ShowUserProfile user",u)
    console.log("Name:", u.u.name);
    // console.log("loggedIn user:", emailId);

  },[u]);


  return (
    <div>
      <div style={{color:'black'}}>
      <div className="post__avatar">
        <Avatar src={profileImage} />
      </div>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
        {/* {u?.name} */}
  {u?.username}
      </div>
    </div>
  )
}

export default React.memo(ShowUserProfile)
