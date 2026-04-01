# 🎬 Ümit Sineması (BingeList) 🍿

**NAIM Challenge "Super Heavyweight" Mobil Uygulama Projesi**

Ümit Sineması, kullanıcıların izlemek istedikleri dizi ve filmleri modern, karanlık temalı (cinematic) bir arayüzde takip etmelerini sağlayan veri odaklı (data-driven) bir kişisel asistan uygulamasıdır. Dr. Nurettin Şenyer tarafından başlatılan **NAIM Challenge** vizyonu doğrultusunda, ağırlık kaldırma metaforuna uygun olarak kademe kademe zorlaşan teknik gereksinimler (API, Local Storage, i18n) başarıyla entegre edilmiştir.

---

## 🚀 Konsept ve Vizyon

Klasik bir "To-Do" uygulamasının çok ötesine geçen Ümit Sineması, gerçek zamanlı internet verileriyle kullanıcının izleme listesini zenginleştirir:
* **Canlı Veri Çekimi:** Kullanıcının yazdığı film/dizi adını anında **TVMaze API** üzerinde aratır, gerçek afiş ve puan bilgilerini getirir.
* **Kalıcı Hafıza:** Veriler sadece ekranda kalmaz, `AsyncStorage` ile cihazın yerel hafızasına (JSON formatında) şifrelenerek kaydedilir. Uygulama kapansa bile veriler kaybolmaz.
* **Global Kullanım:** `i18n` altyapısı sayesinde uygulama anında Türkçe ve İngilizce dilleri arasında geçiş yapabilir.

---

## 🛠 Teknoloji Yığını (Tech Stack)

Proje, modern ve yüksek performanslı bir mobil deneyim sunmak için en yeni teknolojileri harmanlar:

| Teknoloji | Kullanım Amacı |
| :--- | :--- |
| **React Native (Expo)** | Platformlar arası (iOS/Android/Web) yerel mobil uygulama geliştirme ve navigasyon (Tabs). |
| **TVMaze API** | Gerçek zamanlı dizi/film veri ve afiş araması için dış kaynak entegrasyonu. |
| **AsyncStorage** | Verilerin (İzleme listesi JSON dizisi) cihazda kalıcı olarak saklanması. |
| **Antigravity AI** | Kod mimarisi, mantıksal akışlar ve yapay zeka destekli otonom geliştirme süreçleri. |
| **i18n (Context API)** | Çoklu dil desteği ve karanlık/aydınlık tema (Dark Mode) durum yönetimi (State Management). |

---

## ⚖️ NAIM Metrikleri (Iteration Weight)

NAIM Challenge kuralları çerçevesinde projeye eklenen her özellik belirli bir "kilo" (ağırlık) ile temsil edilir. Proje **187 KG** ile **Super Heavyweight** klasmanında tamamlanmıştır.

| Klasman | Kilo (kg) | Tamamlanan Görevler | Durum |
| :--- | :--- | :--- | :--- |
| **🟢 Warm-Up** | 27 kg | Tek ekran mimarisi, karanlık tema, statik metinler, Alert uyarı butonu, özel UI logoları. | ✅ |
| **🟡 Working Set** | 85 kg | Text input, Tab Navigation, FlatList (Scroll), Dinamik Saat/Tarih, Silme özelliği, Dark Mode Toggle, Layout Animations. | ✅ |
| **🔴 Heavy Lifts** | 50 kg | TVMaze API bağlantısı (External API), AsyncStorage (Local Storage), Anlık arama/filtreleme çubuğu. | ✅ |
| **🟣 Boss Level** | 25 kg | Multi-language support (TR/EN dil geçişi). | ✅ |
| **🏆 TOPLAM** | **187 kg** | **Super Heavyweight Seviyesi!** | 🚀 |

---

## ⚙️ Nasıl Çalışır? (Mimari Mantık)

Uygulama, bileşen bazlı (component-based) bir mimariyle çalışır:
1. **Arama ve API:** Kullanıcı arama çubuğuna bir isim yazar. `fetch` metodu ile TVMaze API'sine GET isteği atılır.
2. **Veri İşleme:** API'den dönen karmaşık yapıdaki JSON verisi ayıklanır; isim, resim URL'si ve eklenme saati bir JavaScript objesine dönüştürülür.
3. **Depolama ve Render:** Bu obje `AsyncStorage`'a yazılır ve aynı anda `Context API` üzerinden `FlatList` bileşenine aktarılarak ekranda havalı bir animasyonla (LayoutAnimation) listelenir.
4. **Filtreleme:** Listedeki arama çubuğu, mevcut hafızadaki JSON dizisini filtreleyerek UI'ı anlık olarak (performans kaybı olmadan) günceller.

---

## 📸 Ekran Görüntüleri

*(Projenin çalışan halinden alınan ekran görüntülerini buraya sürükleyip bırakabilirsiniz)*

<img width="257" height="463" alt="Ekran görüntüsü 2026-04-01 151732" src="https://github.com/user-attachments/assets/adbdb2e1-b4de-456d-8ac2-aa79af704e4f" />

<img width="452" height="823" alt="Ekran görüntüsü 2026-04-01 151754" src="https://github.com/user-attachments/assets/b3a44e48-18af-4b21-aa67-ce1db2dcf307" />
<img width="458" height="828" alt="Ekran görüntüsü 2026-04-01 151830" src="https://github.com/user-attachments/assets/a0a5076b-e158-42ae-b8ae-fc9d7963ec51" />
<img width="457" height="828" alt="Ekran görüntüsü 2026-04-01 151900" src="https://github.com/user-attachments/assets/00eceffd-d2d3-43a0-af65-ef493a86a395" />




---

## 📥 Kurulum (Running the App)

Uygulamayı kendi bilgisayarınızda veya cihazınızda test etmek için terminalde şu komutları çalıştırmanız yeterlidir:

```bash
# Bağımlılıkları ve gerekli paketleri yükleyin
npm install

# Web desteği için gerekli ek paketleri yükleyin (Tarayıcıda test etmek için)
npx expo install react-dom react-native-web @expo/metro-runtime

# Sunucuyu başlatın
npx expo start
