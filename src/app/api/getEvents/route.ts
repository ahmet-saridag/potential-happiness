// app/api/getEvents/route.js

import production from "@/enviroments/production.env";
import axios from "axios";

export async function GET() {
  try {
    // Firebase Realtime Database URL
    const firebaseUrl = production.firebaseBaseAPI;

    // Firebase'e veri gönder
    const response = await axios.get(firebaseUrl + "/events.json");

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
