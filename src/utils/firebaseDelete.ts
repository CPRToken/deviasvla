import { deleteObject, ref as storageRef } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { storage, db } from "src/libs/firebase";

export const firebaseDelete = async (
  storagePath: string,
  collectionName: string,
  documentId: string
) => {
  try {
    // Delete from Firebase Storage
    const fileRef = storageRef(storage, storagePath);
    await deleteObject(fileRef);

    // Delete from Firestore
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);

    // Return success
    return { success: true };
  } catch (error) {
    // Handle the error or notify the user
    console.error("Error deleting: ", error);
    return { success: false, error };
  }
};
