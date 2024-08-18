import { firebaseConfig, type Event_Data } from "$lib/types"
import { initializeApp } from "firebase/app"
import { getFirestore,collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

const event_data_collection = collection(db,"Event-Data");
const all_event_data = await getDocs(event_data_collection)

let srcs= new Map();
for(let i=0;i<all_event_data.size;i++){
    srcs.set(all_event_data.docs[i].id,await getDownloadURL(ref(storage,all_event_data.docs[i].data().thumbnail_src)))

}
all_event_data.forEach( async(doc)=>{
    srcs.set(doc.id,await getDownloadURL(ref(storage,doc.data().thumbnail_src)))
})



export const event_data=all_event_data.docs.map((doc)=>{
    return {
        id: doc.data().id as string,
        name: doc.data().name as string,
        description: doc.data().description as string,
        time: doc.data().time as string,
        location: doc.data().location as string,
        thumbnail_src: srcs.get(doc.id)     
    } satisfies Event_Data
})


