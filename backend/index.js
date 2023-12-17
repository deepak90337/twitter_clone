const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.CONNSTR;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const postCollection = client.db("Twitter").collection("posts"); // this collection is for team-ekt
        const userCollection = client.db("Twitter").collection("users"); // this collection is for team-srv

        const isUserRestricted = async (req, res, next) => {
            try {
              const requestingUserId = req.body.loggedInUser.username; // Assuming user ID is stored in req.user
              const requestingUserDoc = await userCollection.findOne({ email: requestingUserId });
              const requestingUserName = requestingUserDoc.username;
              const profileUserId = req.params.userId;
          
              const userDoc = await userCollection.findOne({ email: profileUserId });
              console.log(userDoc);

              // Check if restricted users field exists
             if (!userDoc.restrictedUsers) {
             console.log('No restricted users found.');
    
              return next(); // User is not restricted, proceed

                 }
                
           
              if (userDoc.restrictedUsers.includes(requestingUserName)) {
                return res.status(403).send({ message: 'Access denied.' });
              }
              console.log("request user",req.body.loggedInUser.username);
              next();
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: 'Internal server error' });
            }
          };
        // get
        app.get('/user', async (req, res) => {
            const user = await userCollection.find().toArray();
            res.send(user);
        })
        app.get('/loggedInUser', async (req, res) => {
            const email = req.query.email;
            const user = await userCollection.find({ email: email }).toArray();
            res.send(user);
        })
        app.post('/post', async (req, res) => {
            const post = (await postCollection.find().toArray()).reverse();
            res.send(post);
        })
        app.get('/userPost', async (req, res) => {
            const email = req.query.email;
            const post = (await postCollection.find({ email: email }).toArray()).reverse();
            res.send(post);
        })

        // post
        app.post('/register', async (req, res) => {
            const user = req.body;
            //console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        app.post('/post', async (req, res) => {
            const post = req.body;
            if(/hate|violence|abuse/.test(post.post)){
                post.isFlagged= true;
            }else{  console.log(post.post);
                post.isFlagged = false; }
          
            const result = await postCollection.insertOne(post);
            res.send(result);
        })

        // patch
        app.patch('/userUpdates/:email', async (req, res) => {
            const filter = req.params;
            const profile = req.body;
            const options = { upsert: true };
            const updateDoc = { $set: profile };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })

        app.delete('/deleteOffensivePost', async (req, res) => {
           // const postId = req.params.postId;
          
            // Check if the post is flagged
            // const post = await postCollection.find({ isFlagged: true});
            // if (!post.isFlagged) {
            //   return res.status(400).send('Post is not flagged');
            // }
          
            // Delete the flagged post
            await postCollection.deleteMany({ isFlagged: true });
            res.status(200).send({ message: 'Post deleted successfully' });
          });
          
          app.post('/showuser/:userId', isUserRestricted, async (req, res) => {
            try {
                const userid = req.params.userId;
               
              const user = await userCollection.findOne({ email:req.params.userId });
              res.json(user);
            } catch (error) {
              res.status(500).json({ error: 'Error fetching user' });
            }
          });

          app.post('/privacySetting/:userId', async (req, res) => {
            const userId = req.params.userId;
            const restrictedUsers = req.body.restrictedUsers || []; // Extract the restrictedUsers array from the request body
          
            const updateDoc = {
              $addToSet: { // Use the $addToSet operator to add the restrictedUsers to the existing array
                restrictedUsers: { $each: restrictedUsers },
              },
            };
          
            const result = await userCollection.updateOne({ email: userId }, updateDoc); // Update the user document based on the _id
          
            res.status(200).send(result);
          });
          
          

    } catch (error) {
        console.log(error);
    }
} run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello from Twitter Clone!')
})

app.listen(port, () => {
    console.log(`Twitter clone is listening on port ${port}`)
})
