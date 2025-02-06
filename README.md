To set up and run the project you need to have a mongodb with collection name favorite things and collection name users.
Favorite things is where all of your list items will go into it. An example of this code is this: 
{
  "_id": {
    "$oid": "679bb1962cb7d1001162632a"
  },
  "favoritething": "Food",
  "__v": 0
}

After this you need another collection for users and an example of this code is this:
{
  "_id": {
    "$oid": "679bb1262cb7d10011626326"
  },
  "username": "vengoee",
  "password": "$2a$10$rn.iV2WIEDPttKsrUekb/enNIo1.tdsnlpO4B10bDTZrbwQz3gmbe",
  "email": "vengoe@email",
  "__v": 0
}

Now I know mine added these collections automatically but I am not sure if it will be the same for everyone. Like for users if i tried to register it instantly added the collection.



The authentication  is the same one from class. From my understanding it checks if the req.user.session exists and if it does then it actually lets you go to the next step.

Lastly to add a readme file with the github website all you have to do is click a really large pop up at the buttom of your repo that says add readme. You cannot miss it.
