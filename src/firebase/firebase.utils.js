import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBgXE8CuVp_Yik9Ht39VzN9I1MW2kNt-6s",
    authDomain: "brown-fox-clothing.firebaseapp.com",
    projectId: "brown-fox-clothing",
    storageBucket: "brown-fox-clothing.appspot.com",
    messagingSenderId: "379566046088",
    appId: "1:379566046088:web:22f78e85a442a6b521583d",
    measurementId: "G-9FXR03RE9E"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) =>
{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists)
    {
        const { displayName, email, uid } = userAuth;
        const createdAt = new Date();
        const cart = {};
        const orders = {};

        try
        {
            await userRef.set({
                uid,
                displayName,
                email,
                createdAt,
                cart,
                orders,
                ...additionalData
            });
        }
        catch(error)
        {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

export const getShopData = async () =>
{
    const shop_data_object = {};
    const shop_data = firestore.collection("shop_data");
    await shop_data.get().then(shopSnapshot =>{
        shopSnapshot.docs.forEach(categoryDoc =>{
            shop_data_object[categoryDoc.data().id] = {...categoryDoc.data(), categories:{}};
            categoryDoc.ref.collection("category").get().then((category) =>{
                category.docs.forEach(subCategoryDoc =>{
                    shop_data_object[categoryDoc.data().id]["categories"] = {...subCategoryDoc.data(), items:{}};
                    subCategoryDoc.ref.collection("items").get().then(items =>{
                        items.docs.forEach(item =>{
                            shop_data_object[categoryDoc.data().id]["categories"]["items"][item.data().id] = {...item.data()};
                        });
                    });
                });
            });
        });
    });
    return shop_data_object;
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;