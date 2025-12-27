import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ✅ 네 Firebase 설정 (실제 값)
const firebaseConfig = {
  apiKey: "AIzaSyD9ktSWQKo5N01wD13DWNPUbSRQKqzeuo4",
  authDomain: "irfsupport.firebaseapp.com",
  projectId: "irfsupport",
  storageBucket: "irfsupport.firebasestorage.app",
  messagingSenderId: "71169166954",
  appId: "1:71169166954:web:f6c4ece4291412953bc413"
};

const ADMIN_EMAILS = [
  "grandpric1@gmail.com"
];

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const list = document.getElementById("list");

// 🔐 로그인 + 관리자 체크
onAuthStateChanged(auth, async (user) => {
  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    alert("관리자만 접근 가능합니다");
    location.href = "login.html";
    return;
  }

  // 문의 불러오기
  const q = query(
    collection(db, "inquiries"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const d = doc.data();
    const li = document.createElement("li");

    li.innerHTML = `
      <b>${d.category}</b><br>
      로블록스: ${d.robloxName}<br>
      디스코드: ${d.discordName}<br>
      이메일: ${d.email}<br>
      내용: ${d.description}<br>
      <hr>
    `;

    list.appendChild(li);
  });
});
