import admin from "firebase-admin";

const isTimestamp = (v) => v instanceof admin.firestore.Timestamp;

export const getDateFromFirestore = (date) => {
  return isTimestamp(date) ? date.toDate() : (date ? new Date(date) : null);
}