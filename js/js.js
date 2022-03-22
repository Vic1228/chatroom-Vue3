// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
  push,
  child,
  set,
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB--bltZsBFVeVyksoH0NsNnCKhjTsXzG8",
  authDomain: "vue3chatroom.firebaseapp.com",
  databaseURL: "https://vue3chatroom-default-rtdb.firebaseio.com",
  projectId: "vue3chatroom",
  storageBucket: "vue3chatroom.appspot.com",
  messagingSenderId: "956727936465",
  appId: "1:956727936465:web:d9883bccd9868f815e8cf0",
  measurementId: "G-46TP8KYJ36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

// const msgRef = ref(db, "messages");

// onValue(msgRef, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

//   新增資料測試
//   const key = push(msgRef).key;
//   console.log(key);
//   set(child(msgRef, key), {
//     message: "8 8 8 456",
//   });

// vue code
// const db = getDatabase();
const chatroomRef = ref(db, "chatroom");

const app01 = {
  data() {
    return {
      chatroom: [],
      tempUsername: "",
      username: "",
      message: "",
    };
  },
  methods: {
    addMessage() {
      if (!this.message.trim() || !this.username.trim()) {
        alert("請輸入留言內容及使用者名稱");
        return;
      }
      console.log(this.message);
      const key = push(chatroomRef).key;
      console.log(key);
      set(child(chatroomRef, key), {
        username: this.username,
        message: this.message,
        time: new Date().getTime(),
        key: key,
      });
      this.message = "";
    },
  },
  mounted() {
    onValue(chatroomRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      this.chatroom = data;

      setTimeout(() => {
        var scrollTarget = document.getElementById("chatroom");
        scrollTarget.scrollTop = scrollTarget.scrollHeight;
      }, 100);
    });
  },
};

Vue.createApp(app01).mount("#app01");
