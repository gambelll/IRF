// ✅ 브라우저용 Firebase CDN import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyD9ktSWQKo5N01wD13DWNPUbSRQKqzeuo4",
  authDomain: "irfsupport.firebaseapp.com",
  projectId: "irfsupport",
  storageBucket: "irfsupport.firebasestorage.app",
  messagingSenderId: "71169166954",
  appId: "1:71169166954:web:f6c4ece4291412953bc413",
  measurementId: "G-W8M06HJTNW"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔥 폼 submit 가로채기
document.getElementById("civilForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "inquiries"), {
      robloxName: document.getElementById("roblox").value,
      discordName: document.getElementById("discord").value,
      email: document.getElementById("email").value,
      category: document.getElementById("category").value,
      description: document.getElementById("message").value,
      status: "대기",
      createdAt: serverTimestamp()
    });

    alert("문의가 정상적으로 접수되었습니다.");
    e.target.reset();

  } catch (err) {
    console.error("Firestore 에러:", err);
    alert("전송 실패 (콘솔 확인)");
  }
});
