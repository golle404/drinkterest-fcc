//configuration example - add own credentials and rename file to 'oauth.config.js'
export default {
  twitter: {
  	consumerKey: '',
  	consumerSecret: '',
  	callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  github: {
		clientID: '',
		clientSecret: '',
		callbackURL: "http://127.0.0.1:3000/auth/github/callback"
	}
}
