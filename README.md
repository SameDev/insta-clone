# A React Instagram Clone

* This is a **React Instagram Clone** all rights reserved to [instagram.com](https://instagram.com) and [facebook.com](https://facebook.com/) 

> To use this app you need create a .js File, and name it as firebase.js in this file paste this:

```js
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  // here you need paste your firebase project token api in get this in: console.firebase.google.com

})

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export { db, auth, storage, functions };

```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
