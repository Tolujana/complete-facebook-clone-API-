import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebase";

const imageRef = ref(storage, "image");
