import { getDatabase, ref, push, set } from "firebase/database";
import { app } from "@/features/firebase"; 
// import { getCurrentTimestamp } from "@/lib/utils"; // optional: helper to get timestamp

export async function sendEmergencyAlert(userId: string | null) {
  const db = getDatabase(app);

  // ⚠️ You can organize this structure however you want
  const alertsRef = ref(db, "alerts");

  const newAlertRef = push(alertsRef); // create new alert node

  const alertData = {
    userId: userId || "anonymous",
    timestamp: Date.now(),
    message: "🚨 Emergency alert triggered",
  };

  await set(newAlertRef, alertData); // save alert
}
