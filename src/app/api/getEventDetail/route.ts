import production from "@/enviroments/production.env";
import axios from "axios";

export async function GET(req: Request) {
  try {
    // URL parametresini almak
    const url = new URL(req.url);
    const eventId = url.searchParams.get("id"); // Query string'den 'id' parametresini alıyoruz

    if (!eventId) {
      return new Response(JSON.stringify({ message: "Event ID is required" }), { status: 400 });
    }

    // Firebase Realtime Database URL
    const firebaseUrl = production.firebaseBaseAPI;

    // Firebase'den event verilerini almak için GET isteği
    const response = await axios.get(`${firebaseUrl}/events/${eventId}.json`);

    if (!response.data) {
      return new Response(JSON.stringify({ message: "Event not found" }), { status: 404 });
    }

    // Başarılı yanıt
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.log(error);
    // Hata durumunda yanıt döndür
    return new Response(
      JSON.stringify({ message: "Error fetching event details from Firebase" }),
      { status: 500 }
    );
  }
}
