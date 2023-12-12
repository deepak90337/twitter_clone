import React,{useState} from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import ShowUserProfile from "../../More/ShowUserProfile";
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { useUserAuth } from "../../../context/UserAuthContext"


function Post({ p }) {
  const { name, username, photo, post, profilePhoto } = p;
  const [userp,setUser]= useState({});
  const [isRestricted,setRestrictedUser] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useUserAuth();


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

  const handleShowProfile = async () => {

    const userId = p.email; // Replace with actual user ID
    const loggedInUser = { username: user.email }; // Replace with actual username
  
    try {
      const response = await fetch(`http://localhost:5000/showuser/${userId}`, {
        method: 'POST', // Change to POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loggedInUser }), // Send loggedInUser object in body
      });
      setRestrictedUser(true);
      const statusCode = response.status;
      if (statusCode === 200) {
        setOpen(true);
       
      }
      if (statusCode === 403) {
        alert("Can not view profile");
       
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  // const handleShowProfile = (id) => {
  //    setOpen(true);
  //     const userId = p.email; // Replace with actual user ID
  //     console.log("user ki id post.js",p.email)
  //     fetch(`http://localhost:5000/showuser/${userId}`, {
  //        method: 'GET',
  //       })
  //          .then(response => response.json())
  //           .then(data => setUser(data))
  //            .catch(error => console.error(error));

  //     // console.log("post.js line 15 working on show profile",userp);
  // }
  
  return (
    <div className="post">
      <div className="post__avatar">
        {/* {console.log("post.js line 16 pic link",profilePhoto)} */}
        <Avatar onClick={handleShowProfile} src={profilePhoto} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>{name}{" "}
              <span className="post__headerSpecial">
                <VerifiedUserIcon className="post__badge" /> @{username}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{post}</p>
          </div>
        </div>
        <img src={photo} alt="" width='500' />
        <div className="post__footer">
          <ChatBubbleOutlineIcon className="post__footer__icon" fontSize="small" />
          <RepeatIcon className="post__footer__icon" fontSize="small" />
          <FavoriteBorderIcon className="post__footer__icon" fontSize="small" />
          <PublishIcon className="post__footer__icon" fontSize="small" />
        </div>
       
      </div>
      {isRestricted && (
      <Modal   open={open}>
      <Box sx={style} className="modal">
          <div className='header'>
            <IconButton onClick={() => { setOpen(false); }} ><CloseIcon /></IconButton>
          </div>
  
          <div>
          <h2 style={{marginLeft:5}}> User's Profile</h2>
          <ShowUserProfile u={userp}  reqUser={{emailId :user.email}}/>
          </div>

          </Box>
        
      </Modal>)}
      {/*!isRestricted && <p>User cannot view profile</p>*/}
   
    </div>
    
  );
}


export default Post;