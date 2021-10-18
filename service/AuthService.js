module.exports ={
    getUser: function() {  //checks if user in stored in session storage
        const user = sessionStorage.getItem('user');
        if(user === 'undefined' || !user){
            return null;
        } else {
            return JSON.parse(user);
        }
    },

    getToken: function() {
        return sessionStorage.getItem('token');
    },

    setUserSession: function(user, token) {
        sessionStorage.getItem('user', JSON.stringify(user));
        sessionStorage.getItem('token', token);
    },

    resetUserSession: function() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    }
}