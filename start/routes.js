'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

var admin = require("firebase-admin");

var serviceAccount = require("../fir-first-7873a-firebase-adminsdk-cazaq-6a0f33212f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-first-7873a.firebaseio.com"
});

var db = admin.firestore()

Route.on('/').render('welcome')

Route.get('get', ()=>{
  var data = {
    name: 'Hello, World!',
    gender: true,
    age: 22,
    date_join: new Date('December 10, 1815'),
    arrayExample: [5, true, 'hello'],
    nullExample: null,
    phone: {
      home: '0905111222',
      work: '0906222333'
    }
  }

  db.collection('Users').doc('test').set(data)

  var citiesRef = db.collection('cities');
  var setSf = citiesRef.doc('SF').set({
    name: 'San Francisco', state: 'CA', country: 'USA',
    capital: false, population: 860000
  });
  var setLa = citiesRef.doc('LA').set({
    name: 'Los Angeles', state: 'CA', country: 'USA',
    capital: false, population: 3900000
  });
  var setDc = citiesRef.doc('DC').set({
    name: 'Washington, D.C.', state: null, country: 'USA',
    capital: true, population: 680000
  });
  var setTok = citiesRef.doc('TOK').set({
    name: 'Tokyo', state: null, country: 'Japan',
    capital: true, population: 9000000
  });
  var setBj = citiesRef.doc('BJ').set({
    name: 'Beijing', state: null, country: 'China',
    capital: true, population: 21500000
  });
  var setHcm = citiesRef.doc('HCM').set({
    name: 'Ho Chi Minh', state: null, country: 'Vietnam',
    capital: true, population: 11500000
  });

  // Add a new document with a generated id.
  var addDoc = db.collection('cities').add({
    name: 'Sapa',
    country: 'Vietnam'
  }).then(ref => {
    console.log('Added document with ID: ', ref.id);
  });

  var cityRef = db.collection('cities').doc('SF');
  var getDoc = cityRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
})
