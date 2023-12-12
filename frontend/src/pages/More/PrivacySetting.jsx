import React,{useState} from 'react'
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
//import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Avatar} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useUserAuth } from "../../context/UserAuthContext"


function PrivacySetting() {
    const [open, setOpen] = useState(false);
    const [restrictedUsers, setRestrictedUsers] = useState([]);
    const { user } = useUserAuth();

  console.log("logged email",user.email);
    const handleInputChange = (event) => {
      const newRestrictedUsers = event.target.value.split(',');
      setRestrictedUsers(newRestrictedUsers);
    };
    
    const removeUsernameFromList =(restrictedUser) =>{
      const updatedUsernames = restrictedUsers.filter((username) => username !== restrictedUser);
      setRestrictedUsers(updatedUsernames);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 8,
      };

      const userData = {
        restrictedUsers : restrictedUsers,
      }
  
      const userId = user?.email;
  const handlePrivacy = async (e) => {
    e.preventDefault();
  try {
    const response = await axios.post(`http://localhost:5000/privacySetting/${userId}`, userData);
    if (response.status === 200) {
      console.log('Privacy settings updated successfully');
    } else {
      console.error('Error updating privacy settings');
    }
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div>
        <div>
      This is privacy setting page
      <div>
      <button onClick={(e)=>setOpen(true)}> To set who can view Your profile photo and personal details </button>
      </div>
      
   
      </div>
      <Modal   open={open}>
      <Box sx={style} className="modal">
          <div className='header'>
            <IconButton onClick={() => { setOpen(false); }} ><CloseIcon /></IconButton>
          </div>
          <h2 style={{marginLeft:5}}> Enter the names of user</h2>
          
         <form onSubmit={handlePrivacy}>
            Enter usernames : <input type='text' onChange={handleInputChange} />
            <button type='submit'>Submit</button>
         </form>
          <div>
            <List>
          {restrictedUsers.map((restrictedUser) => (
             <Grid item xs={12} md={6}>
  <ListItem key={restrictedUser}
  secondaryAction={
    <IconButton edge="end" aria-label="delete">
      <DeleteIcon onClick={() => removeUsernameFromList(restrictedUser)}/>
    </IconButton>} >
    <ListItemAvatar>
      <Avatar>
        <AccountCircleIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={restrictedUser} />
  </ListItem>
  </Grid>
))}
</List>
         </div>
         </Box>
         </Modal>
   
    </div>
    

  )
}

export default PrivacySetting
