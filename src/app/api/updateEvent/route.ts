import production from "@/enviroments/production.env";
import axios from "axios";

export async function PUT(req: Request) {
  try {
    // URL parametresini almak
    const url = new URL(req.url);
    const eventId = url.searchParams.get("id"); // Query string'den 'id' parametresini alıyoruz

    if (!eventId) {
      return new Response(JSON.stringify({ message: "Event ID is required" }), {
        status: 400,
      });
    }

    // İstek gövdesinden güncellenecek veriyi almak
    const reqResponse = await req.json();

    if (!reqResponse.data || Object.keys(reqResponse.data).length === 0) {
      return new Response(
        JSON.stringify({ message: "Update data is required" }),
        { status: 400 }
      );
    }

    // Firebase Realtime Database URL
    const firebaseUrl = production.firebaseBaseAPI;

    // Firebase'e PUT isteği ile güncelleme yapma
    const response = await axios.put(
      `${firebaseUrl}/events/${eventId}.json`,
      reqResponse.data
    );

    // Başarılı yanıt
    return new Response(JSON.stringify(reqResponse.data), { status: 200 });
  } catch (error) {
    console.log(error);
    // Hata durumunda yanıt döndür
    return new Response(
      JSON.stringify({ message: "Error updating event details in Firebase" }),
      { status: 500 }
    );
  }
}
