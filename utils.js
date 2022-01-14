const fs = require('fs')
const uniqid = require('uniqid'); 


const loadUsers = () => {
    try{
        const dataBuffer = fs.readFileSync('./database/users.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
        // console.log('Got the user');
    }
    catch(e) {
        return [];
    }
   
};
const stringToJson = (message, string, message2, string2) => {
    return JSON.stringify({ [message]: string, [message2]: string2 });
  };

  const getUserIndex =(userId) => {
    const users = loadUsers();
    const index = users.findIndex((user) => {
        if (user.id === userId){
            return true
        }
        else {
            return false
        }
    })
    return index;
  }

const addUser = (body) => {
    const users = loadUsers();
    users.find((user) => {
    if (user.id === body.id) {
      throw Error('The user is already exist');
    }
  });
    body.id = uniqid();
    users.push(body);
    saveUsers(users);
    return stringToJson(`new-client`, body);
}

const saveUsers = (users) => {
    const dataJSON = JSON.stringify(users);
    fs.writeFileSync('./database/users.json', dataJSON)
}

const deleteUser = (userId) => {
   const users = loadUsers();
   const updatedUsers = users.filter((user) => {
        if(userId !== user.id) {
            return true;
        }
        else false;
    })
    if(updatedUsers.length === users.length) {
        throw Error('User not found');
    }
    saveUsers(updatedUsers)
}

const depositCash = (userId, cashAmount) => {
    const users = loadUsers();
    const index = getUserIndex(userId)
    if(index === -1){
        throw Error('User not found'); 
    }
    users[index].cash += cashAmount
    saveUsers(users)
}

const transferCash = (userId, cashAmount, targetId) => {
    const users = loadUsers();
    const index = getUserIndex(userId);
    if(index === -1){
        throw Error('Transferring user not found'); 
    }

    const targetIndex = getUserIndex(targetId);
    if(targetIndex === -1){
        throw Error('Target user not found'); 
    }
    if( users[index].cash + users[index].credit < cashAmount ){
        throw Error('User Does not have enough credit to make the transfer')
    }
    users[targetIndex].cash += cashAmount;
    users[index].cash -= cashAmount;
    saveUsers(users)
}

const getSingleUser = (id) => {
    const users = loadUsers();
    const index = getUserIndex(id);
    if(index === -1){
        throw Error('Transferring user not found'); 
    }
    return users[index]
}

module.exports = {
    loadUsers,
    addUser,
    deleteUser,
    depositCash,
    transferCash,
    getSingleUser
}