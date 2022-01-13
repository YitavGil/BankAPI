const fs = require('fs')


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

const addUser = (body) => {
    const users = loadUsers();
    users.find((user) => {
    if (user.id === body.id) {
      throw Error('The user is already exist');
    }
  });
    users.push(body);
    saveUsers(users);
    return stringToJson('new-client', body);
}

const saveUsers = (users) => {
    const dataJSON = JSON.stringify(users);
    fs.writeFileSync('./database/users.json', dataJSON)
}

module.exports = {
    loadUsers,
    addUser,
}