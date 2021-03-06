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
        const paymentDetails = {nameOnCard:'', cardNumber:'', expirationDate:'', CVV:''};
        const address = {street:'', city:'', state: '', zip:''};

        try
        {
            await userRef.set({
                uid,
                displayName,
                email,
                createdAt,
                cart,
                paymentDetails,
                address,
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

export const updateUserInfo = async (uid, address, paymentDetails) =>
{
    if(paymentDetails === null)
    {
        await firestore.doc(`users/${uid}`).update({address: address});
        return;
    }

    if(address === null)
    {
        await firestore.doc(`users/${uid}`).update({paymentDetails: paymentDetails});
        return;
    }

    await firestore.doc(`users/${uid}`).update({address: address, paymentDetails: paymentDetails});
}

export const addUserOrder = async (uid, address, paymentDetails, cart, total) =>
{
    const snapShot = await firestore.doc(`orders/${uid}`).get();
    let orders = {};
    let newOrderId = 1;
    const orderDate = new Date();
    let newOrder = {
        id: newOrderId, 
        uid: uid, address: address, 
        paymentDetails: paymentDetails, 
        cart: cart, 
        orderDate: orderDate, 
        total: Number(total).toFixed(2)
    };
    if(snapShot.exists)
    {
        orders = snapShot.data().orderObject
        newOrderId = Object.keys(orders).length + 1;
        newOrder["id"] = newOrderId;
        orders[newOrderId] = newOrder;
        await firestore.doc(`orders/${uid}`).update({orderObject: orders});
    }
    else
    {
        orders[newOrderId] = newOrder;
        await firestore.doc(`orders/${uid}`).set({orderObject: orders});
    }
}

export const getUserOrders = async (uid) =>
{
    const snapShot = await firestore.doc(`orders/${uid}`).get();
    if(snapShot.exists)
        return snapShot.data().orderObject;
    return {};
}

export const getShopData = async () =>
{
    const shop_data_object = {};
    const shop_data = firestore.collection("shop_data");

    await shop_data.get().then(async shopSnapshot =>{
        await Promise.all(shopSnapshot.docs.map(async categoryDoc =>{
            shop_data_object[categoryDoc.data().id] = {...categoryDoc.data(), categories:{}};
            await categoryDoc.ref.collection("categories").get().then(async (category) =>{
                await Promise.all(category.docs.map( async subCategoryDoc =>{
                    shop_data_object[categoryDoc.data().id]["categories"][subCategoryDoc.data().id] = {...subCategoryDoc.data(), items:{}};
                    await subCategoryDoc.ref.collection("items").get().then(items =>{
                        items.docs.forEach(item =>{
                            shop_data_object[categoryDoc.data().id]["categories"][subCategoryDoc.data().id]["items"][item.data().id] = {...item.data()};
                        });
                    });
                }));
            });
        }));
    });
    
    return shop_data_object;
}


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;