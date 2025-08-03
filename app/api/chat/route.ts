import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

export const dynamic = 'force-dynamic';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
  let message: string;
  
  try {
    const body = await request.json();
    message = body.message;
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Create the prompt for the IBM Granite model
    const prompt = `Anda adalah AI Assistant untuk Sistem Penyuratan Digital. Jawab dalam bahasa Indonesia dengan profesional dan membantu.

Konteks sistem:
- Sistem penyuratan digital dengan 3 jenis pengguna: Bagian Umum, ADC, dan Direktur
- Bagian Umum: mengelola surat masuk dan keluar
- ADC: administrasi dan koordinasi dokumen
- Direktur: persetujuan dan pengambilan keputusan
- Sistem memiliki workflow otomatis, notifikasi, dan pelacakan status

Pertanyaan pengguna: ${message}

Berikan jawaban yang:
1. Spesifik tentang fitur sistem
2. Membantu pengguna memahami cara kerja
3. Profesional dan mudah dipahami
4. Maksimal 200 kata

Jawaban:`;

    const input = {
      top_k: 50,
      top_p: 0.9,
      prompt: prompt,
      max_tokens: 512,
      min_tokens: 0,
      temperature: 0.6,
      presence_penalty: 0,
      frequency_penalty: 0
    };

    // Use the stream method to get response from IBM Granite model
    let response = '';
    for await (const event of replicate.stream("ibm-granite/granite-3.3-8b-instruct", { input })) {
      response += event.toString();
    }

    // Clean up the response
    const cleanResponse = response.trim();
    
    if (cleanResponse) {
      return NextResponse.json({ response: cleanResponse });
    } else {
      // Fallback response if API returns empty
      return NextResponse.json({ 
        response: getHelpfulResponse(message) 
      });
    }

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Use fallback response on error
    return NextResponse.json({ 
      response: getHelpfulResponse(message || '')
    });
  }
}

function getHelpfulResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('surat') || lowerMessage.includes('dokumen')) {
    return `## Sistem Penyuratan Digital

Sistem ini memungkinkan Anda mengelola surat masuk dan keluar secara digital dengan fitur:

- **Membuat surat baru** dengan template siap pakai
- **Melacak status** persetujuan secara real-time
- **Mengirim surat** untuk review dan approval
- **Melihat riwayat** dokumen lengkap
- **Disposisi otomatis** sesuai workflow

💡 **Tip**: Klik tombol "Buat Surat" di dashboard untuk memulai.`;
  }
  
  if (lowerMessage.includes('workflow') || lowerMessage.includes('alur')) {
    return `## Alur Kerja Sistem

### Berdasarkan Peran:

1. **Bagian Umum**
   - Buat dan kelola surat
   - Input surat masuk
   - Kirim ke ADC untuk koordinasi

2. **ADC** 
   - Review dan koordinasi dokumen
   - Teruskan ke Direktur jika diperlukan
   - Monitoring workflow

3. **Direktur**
   - Memberikan persetujuan final
   - Pengambilan keputusan strategis

📊 Status dokumen akan terupdate otomatis di setiap tahap.`;
  }
  
  if (lowerMessage.includes('login') || lowerMessage.includes('masuk')) {
    return `## Cara Login ke Sistem

### Langkah-langkah:
1. **Pilih peran** Anda:
   - Bagian Umum (pengelolaan surat)
   - ADC (administrasi & koordinasi)
   - Direktur (persetujuan & keputusan)

2. **Masukkan** username dan password
3. **Klik** "Masuk ke Sistem"

🔐 Setiap peran memiliki dashboard dan fitur yang sesuai dengan tugasnya.`;
  }
  
  if (lowerMessage.includes('notifikasi') || lowerMessage.includes('pemberitahuan')) {
    return `## Sistem Notifikasi

### Anda akan mendapat pemberitahuan untuk:

- 📧 **Surat baru** yang perlu direview
- ✅ **Update status** persetujuan
- ⏰ **Deadline** yang mendekati
- 📋 **Dokumen** yang butuh tindak lanjut
- 🔄 **Disposisi** masuk

### Lokasi Notifikasi:
- Ikon lonceng di header dashboard
- Panel notifikasi di sidebar
- Alert real-time saat ada update

🔔 Notifikasi akan muncul secara otomatis dan real-time.`;
  }

  if (lowerMessage.includes('disposisi')) {
    return `## Fitur Disposisi

### Cara Menggunakan:
1. **Buka surat** yang akan didisposisi
2. **Klik tombol** disposisi (ikon panah)
3. **Pilih tujuan** disposisi
4. **Tambahkan instruksi** dan catatan
5. **Set deadline** jika diperlukan
6. **Kirim disposisi**

### Fitur Disposisi:
- ✉️ Routing otomatis ke penerima
- 📝 Catatan dan instruksi khusus
- ⏱️ Penetapan deadline
- 🔄 Tracking status disposisi
- 📊 Laporan disposisi

💼 Disposisi membantu koordinasi antar departemen menjadi lebih efisien.`;
  }
  
  return `## Selamat Datang di AI Assistant! 🤖

Saya siap membantu Anda dengan **Sistem Penyuratan Digital**. 

### Topik yang bisa ditanyakan:

📝 **Pengelolaan Surat**
- Cara membuat dan mengelola surat
- Template dan format surat
- Upload dan lampiran dokumen

🔄 **Workflow & Proses**
- Alur persetujuan dokumen
- Sistem disposisi
- Review dan approval

👥 **Fitur Berdasarkan Peran**
- Dashboard Bagian Umum
- Panel ADC
- Interface Direktur

📊 **Dashboard & Monitoring**
- Cara menggunakan dashboard
- Statistik dan laporan
- Notifikasi dan tracking

💡 **Silakan ajukan pertanyaan spesifik** tentang fitur yang ingin Anda ketahui!`;
}