// app/api/addEvent/route.js

import production from "@/enviroments/production.env";
import axios from "axios";

export async function POST(req: any) {
  try {
    const { data } = await req.json(); // JSON verisini al

    // Firebase Realtime Database URL
    const firebaseUrl = production.firebaseBaseAPI;

    // Firebase'e veri gönder
    const response = await axios.post(firebaseUrl + "/contact.json", data);

    // Başarı durumunda yanıt döndür
    return new Response(JSON.stringify(response.data), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    // Hata durumunda yanıt döndür
    return new Response(
      JSON.stringify({ message: "Error sending data to Firebase" }),
      { status: 500 }
    );
  }
}
