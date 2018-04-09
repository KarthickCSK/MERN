
// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
  JWT: {
          secret: 'e3rwefsd'
      },
      FACEBOOK: {
          // your App ID
          clientID: '590107647850876',
          // your App Secret
          clientSecret: 'cd6ded9b72070de8caef04c27fa6abdf',
          callbackURL: 'http://localhost:8080/auth/facebook/callback',
          profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
          profileFields:   ['id','displayName','photos','gender','profileUrl','email']
      },
      GOOGLE: {
              clientID: '252912608151-pehrsr21qi73d3iasn4urr5rgs4pejsd.apps.googleusercontent.com',
              clientSecret: 'LZSi1SXEhOTJ84T1xv6JhXxM',
              callbackURL: 'http://localhost:8080/auth/google/callback',
              profileFields:   ['id','displayName','photos','gender','profileUrl','email']
          }
};
