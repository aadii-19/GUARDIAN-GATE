import { getDatabase, ref, push } from "firebase/database";
import { getCurrentTimestamp } from "@/lib/utils";
import { app } from "./firebase"; // since firebase.ts is in the same folder

export async function sendEmergencyAlert(uid: string | null) {
  console.log("📡 Reached sendEmergencyAlert!", uid); // 🪵 Log user ID

  const db = getDatabase(app);
  const alertsRef = ref(db, "emergency_alerts");

  const alertData = {
    userId: uid || "anonymous",
    timestamp: getCurrentTimestamp(),
    message: "Emergency alert triggered",
  };

  console.log("📝 Data being pushed:", alertData); // 🪵 Log data

  await push(alertsRef, alertData);

  console.log("✅ Data pushed to Firebase!");
}

