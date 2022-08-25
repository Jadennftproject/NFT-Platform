const firebaseConfig = {
    apiKey: "AIzaSyBUbr84DgT7IkcSC_ccFxfKmH2kZvrSYts",
    authDomain: "nftproject-65292.firebaseapp.com",
    databaseURL: "https://nftproject-65292-default-rtdb.firebaseio.com",
    projectId: "nftproject-65292",
    storageBucket: "nftproject-65292.appspot.com",
    messagingSenderId: "990906482243",
    appId: "1:990906482243:web:eba8e6aff375405c0fdef6"
  };

  firebase.intializeApp(firebaseConfig);

  const checkout = document.getElementById('checkout')

  checkout.addEventListener('click'), () => {
      console.log('CLICKED')
  }