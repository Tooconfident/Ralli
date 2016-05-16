var Firebase = require('firebase');
var FirebaseUsersUrl = 'https://ralli.firebaseio.com/users';
var UsersRef = new Firebase(FirebaseUsersUrl);

// To check user login state:
// firebase provides function #getAuth(), you can invoke it
// one the firebase reference to get current user. This works
// like checking a session[:user_id], but firebase returns the
// current user object

// To log a user out, invoke #unAuth() on the firebase reference

// to see the logging info uncomment the code on the bottom and
// npm <FILENAME> to see


var usersApi = {
  createNewUser: function(userEmail, userPassword, userName) {
   return UsersRef.createUser({
            email    : userEmail,
            password : userPassword
          }, (err, newUserData) => {
            if (err) {
              console.log("Fail sigup");
            }
          }).then((res) => {
            return this.loginUser(userEmail, userPassword)
          }).then((res) => {
            UsersRef.push({
              username: userName,
              email: userEmail,
              avatarUrl: res.password.profileImageURL,
              groups: []
            })
          });
  },

  loginUser: function(userEmail, userPassword) {
    return UsersRef.authWithPassword({
              email    : userEmail,
              password : userPassword
            }, function(error, authData) {
              if (error) {
                console.log("Login Failed");
              }else {
                console.log('success');
                return authData;
              }
            });
  },

  getUserByEmail: function(email) {
    return UsersRef
             .orderByChild('email')
             .equalTo(email)
             .once('value');
  },

  getCurrentUser: function() {
    return UsersRef.getAuth();
  }
}

module.exports = usersApi;





// var theUser;
// console.log(usersApi.loginUser('gum@gum.com', 'gumerlock').then((res) => {
//   theUser = UsersRef.getAuth();
//   console.log("*****************************************************");
//   console.log(theUser);
//   console.log("************************* LOGING OUT ****************************");
//   UsersRef.unauth();
//   console.log("*****************************************************");
//   console.log(UsersRef.getAuth());
// }));
// console.log(usersApi.getUserByEmail("ouchunyu@yahoo.com") == true)
