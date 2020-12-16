import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { setCurrentUser } from '../redux'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from '../axios'

// firebase config
let app;
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

export const auth = app.auth();

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser))
  }
}

const characters = 'ABCGHIJKLMNOUVWXYZabcdefgjklmnqstuvwxyz03456789'
function generateString(length) {
	let result = ' '
	const charactersLength = characters.length
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}

	return result
}

  
function FirebaseSignIn({ setCurrentUser}) {

  const history = useHistory()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // setLoading(true)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log({user})
      if (user) {
        const authUser = {
          name: user.displayName,
          email: user.email, 
          uid: user.uid,
          photoURL: `https://avatars.dicebear.com/api/male/${generateString(
            4
          )}.svg?mood[]=happy`
        }
        setCurrentUser(authUser)
        axios.post('/users', authUser) // storing user to mongoDB
        .then(() => {
          history.push('/')
        })
        .catch(err => {
          console.error(err)
          user.delete()
          setCurrentUser(null)
        })
        
      } else {
        setCurrentUser(null)
        setLoading(false)
      }
    })

    return unsubscribe
  }, [setLoading, history, setCurrentUser])

  if(loading) {
    return <p>Loading...</p>
  }
  
  return (
    <div>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  )
  

}



export default connect(null, mapDispatchToProps)(FirebaseSignIn)
