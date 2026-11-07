/* Bahasa (ID/EN) */

/* Pengaturan bahasa (Indonesia / English), disimpan di localStorage.
   Kode aplikasi tetap menulis teks Indonesia. Saat English aktif, teks yang masuk ke halaman (MutationObserver)
   diganti memakai kamus EN di bawah. Isian pengguna (judul aduan, nama, dll) tidak diterjemahkan */
const KUNCI_BAHASA = 'disty-helpdesk-bahasa';
let bahasa = 'id';
try { bahasa = localStorage.getItem(KUNCI_BAHASA) === 'en' ? 'en' : 'id'; } catch {}

const EN = {
  /* umum */
  "Beranda": "Home", "Dashboard": "Dashboard", "Profil": "Profile", "Profil Saya": "My Profile", "Keluar": "Log out", "Masuk": "Log in",
  "Memeriksa akun...": "Checking account...", "Memuat sesi...": "Loading session...", "Informasi": "Information", "Baiklah": "OK",
  "Batal": "Cancel", "Tutup": "Close", "Tambah": "Add", "Simpan Perubahan": "Save Changes", "Simpan progres": "Save progress", "Kirim aduan": "Submit complaint",
  "Detail": "Details", "Lihat detail": "View details", "Aksi": "Action", "Tindakan": "Action", "Tidak": "No", "Ya, sudah": "Yes, it is", "Belum": "Not yet", "Sebagian": "Partially",
  "Halaman": "Page", "Menu Utama": "Main Menu", "Cetak": "Print", "Hapus foto": "Remove photo", "Ubah Foto": "Change Photo", "← Kembali": "← Back",
  "Email": "Email", "Kata sandi": "Password", "Nama": "Name", "Nama Lengkap": "Full Name", "Nomor Telepon": "Phone Number", "Telepon": "Phone", "Alamat": "Address", "Pesan": "Message",
  "Layanan": "Services", "Bantuan": "Help", "Informasi Pribadi": "Personal Information", "Pengaturan Akun": "Account Settings", "Ubah Kata Sandi": "Change Password",
  "Kelola kata sandi akun Anda": "Manage your account password", "Notifikasi": "Notifications", "Atur preferensi notifikasi": "Set your notification preferences",
  "Bahasa": "Language", "Pilih bahasa yang digunakan": "Choose the language you use", "Pilih Bahasa": "Choose Language", "Tema": "Theme", "Atur tampilan aplikasi": "Adjust the app appearance",
  "Kelola informasi akun Anda untuk pengalaman yang lebih baik.": "Manage your account information for a better experience.",
  "Profil disimpan": "Profile saved", "Nama dan email yang valid wajib diisi": "A valid name and email are required",
  "Isi email dengan benar": "Enter a valid email", "Masukkan kata sandi": "Enter your password", "Isi kata sandi": "Enter your password",
  "Sesi berakhir, silakan masuk lagi": "Session expired, please log in again",
  /* login & beranda */
  "Bantuan teknis yang tercatat dan terpantau.": "Technical help that is recorded and tracked.",
  "Laporkan kendala, ajukan pengembangan fitur, dan pantau penanganannya per jam sampai selesai.": "Report issues, request new features, and track their handling hour by hour until done.",
  "Aduan diteruskan ke teknisi yang tepat": "Complaints are forwarded to the right technician",
  "Target waktu penanganan sesuai prioritas": "Handling time targets based on priority",
  "Riwayat tindakan tersimpan lengkap": "Complete action history is kept",
  "PT Disty Teknologi Indonesia, Surabaya": "PT Disty Teknologi Indonesia, Surabaya",
  "Layanan bantuan sistem untuk klien": "System support service for clients",
  "Masuk ke HelpDesk": "Log in to HelpDesk", "Sudah menjadi client kami? Masuk dan pantau aduan Anda.": "Already our client? Log in and track your complaints.",
  "Ajukan laporan atau konsultasi dengan mudah dan cepat.": "Submit reports or consultations easily and quickly.",
  "Pusat layanan bantuan teknis untuk client": "Technical support center for clients",
  "Layanan bantuan teknis untuk client PT Disty Teknologi Indonesia: website, aplikasi, IoT, dan integrasi API.": "Technical support for clients of PT Disty Teknologi Indonesia: websites, apps, IoT, and API integration.",
  "Laporkan kendala, ajukan pengembangan fitur, dan jadwalkan konsultasi. Setiap aduan ditangani tim teknisi dan dapat dipantau sampai selesai.": "Report issues, request new features, and schedule consultations. Every complaint is handled by our technician team and can be tracked until it is done.",
  "Disty Teknologi hadir untuk membantu Anda menyampaikan laporan, mendapatkan informasi, dan solusi terbaik untuk setiap kebutuhan.": "Disty Teknologi is here to help you submit reports, get information, and find the best solution for every need.",
  "Layanan teknologi": "Technology services", "Mitra dan kerja sama": "Partners and collaboration", "Untuk Client": "For Clients", "Client memakai hasil kami": "Clients use our work",
  "Support sistem": "System support", "Tahun berdiri": "Year founded", "Solusi teknologi untuk perusahaan Anda": "Technology solutions for your company",
  "Dari website dan aplikasi, integrasi pembayaran, hingga pelatihan SDM bidang IT.": "From websites and apps, payment integration, to IT staff training.",
  "Web Development": "Web Development", "Website berbasis cloud dengan basis data tanpa batas.": "Cloud-based websites with unlimited databases.",
  "Mobile Development": "Mobile Development", "Website responsif yang tampil sempurna di layar mobile.": "Responsive websites that look perfect on mobile screens.",
  "Aplikasi Android & iOS": "Android & iOS Apps", "Tersedia di Google Play dan App Store.": "Available on Google Play and the App Store.",
  "Digital Marketing": "Digital Marketing", "SEO dan konten Facebook, Google, Instagram, TikTok.": "SEO and content for Facebook, Google, Instagram, TikTok.",
  "Enterprise Integration": "Enterprise Integration", "Web service untuk pembayaran e-wallet dan antar aplikasi.": "Web services for e-wallet payments and app-to-app integration.",
  "Artificial Intelligence": "Artificial Intelligence", "Otomatisasi, prediksi, dan rekomendasi.": "Automation, prediction, and recommendations.",
  "Internet of Things": "Internet of Things", "Kendali jarak jauh teknologi 4.0 terintegrasi aplikasi Anda.": "Remote-control Industry 4.0 technology integrated with your app.",
  "Training & Sertifikasi IT": "IT Training & Certification", "In-house, private, dan online training.": "In-house, private, and online training.",
  "Cara kerja kami dalam setiap proyek": "How we work on every project", "Empat tahap dari analisa kebutuhan sampai maintenance berkala.": "Four stages from requirements analysis to regular maintenance.",
  "Analisa Kebutuhan": "Requirements Analysis", "Implementasi & Maintenance": "Implementation & Maintenance",
  "Membuat program sesuai rancangan dan menguji untuk mencari bug dan error.": "Building the program to the design and testing it to find bugs and errors.",
  "Implementasi ke client, maintenance berkala, backup, dan support 24 jam.": "Deployment to the client, regular maintenance, backups, and 24-hour support.",
  "Hubungi Kami": "Contact Us", "Lihat Kontak": "View Contacts", "Hubungi tim kami di Surabaya, atau ajukan lewat menu konsultasi di HelpDesk.": "Contact our team in Surabaya, or submit through the consultation menu in HelpDesk.",
  "Gedung Graha Pena lt. 5, Jl. A. Yani No. 88, Surabaya.": "Graha Pena Building 5th floor, Jl. A. Yani No. 88, Surabaya.",
  "Ruang Riset PT Disty Teknologi Indonesia": "PT Disty Teknologi Indonesia Research Room", "Buka di Google Maps": "Open in Google Maps",
  "Disty Desk © 2026. Melayani dengan hati, memberi solusi.": "Disty Desk © 2026. Serving with heart, delivering solutions.",
  "© 2026 PT Disty Teknologi Indonesia. Hak cipta dilindungi.": "© 2026 PT Disty Teknologi Indonesia. All rights reserved.",
  "Panduan, FAQ, dan informasi lainnya": "Guides, FAQs, and other information", "Jawaban cepat untuk masalah yang sering terjadi.": "Quick answers to common problems.",
  "Cari artikel bantuan": "Search help articles", "Cari jawaban lebih cepat": "Find answers faster", "Artikel untuk masalah yang sering dilaporkan.": "Articles for frequently reported problems.",
  "Artikel tidak ditemukan. Masuk lalu buat aduan.": "No article found. Log in and create a complaint.", "Masih bingung?": "Still confused?",
  "Pertanyaan yang sering diajukan": "Frequently asked questions", "Butuh bantuan lebih lanjut? Hubungi tim kami": "Need more help? Contact our team",
  "Panduan penggunaan sistem": "System user guide", "Video tutorial": "Video tutorials", "Pusat Bantuan": "Help Center",
  /* menu & halaman */
  "Aduan": "Complaints", "Aduan Saya": "My Complaints", "Semua Aduan": "All Complaints", "Buat Aduan": "Create Complaint", "Buat aduan": "Create complaint", "Detail Aduan": "Complaint Details",
  "Aduan Terbaru": "Latest Complaints", "Aduan terbaru": "Latest complaints", "Konsultasi": "Consultation", "Detail Konsultasi": "Consultation Details", "Tim Teknisi": "Technician Team",
  "Laporan": "Reports", "Laporan Bulanan": "Monthly Report", "Tugas Saya": "My Tasks", "Detail Tugas": "Task Details", "Riwayat Penanganan": "Handling History", "Riwayat solusi": "Solution history",
  "Riwayat Solusi Sebelumnya": "Previous Solution History", "Kontak Admin": "Contact Admin", "Kepuasan Layanan": "Service Satisfaction", "Survei Kepuasan Layanan": "Service Satisfaction Survey",
  "Isi Survei": "Take Survey", "Ubah Survei": "Edit Survey", "Kirim Survei": "Submit Survey", "Aksi Cepat": "Quick Actions", "Tips untuk Anda": "Tips for You", "Informasi Penting": "Important Information",
  "Pengumuman": "Announcements", "Pemeliharaan Sistem": "System Maintenance", "Fitur Baru": "New Features", "Status Layanan": "Service Status", "Penilaian layanan": "Service rating",
  "Ringkasan helpdesk, 1 Oktober 2026": "Helpdesk summary, October 1, 2026", "Total Tugas": "Total Tasks", "Tugas Terbaru": "Latest Tasks", "Tugas Aktif": "Active Tasks",
  "Selamat datang di halaman teknisi. Berikut adalah tugas dan aduan yang perlu kamu tangani.": "Welcome to the technician page. Here are the tasks and complaints you need to handle.",
  "Daftar tugas yang perlu kamu selesaikan.": "List of tasks you need to complete.", "Daftar aduan yang pernah kamu tangani.": "List of complaints you have handled.",
  "Kerjakan tugas sesuai prioritas": "Work on tasks by priority", "Tidak ada tugas": "No tasks", "Belum ada tugas.": "No tasks yet.", "Semua aduan sudah ditangani.": "All complaints have been handled.",
  "Aduan ini sudah selesai.": "This complaint is already resolved.", "Mulai kerjakan": "Start working", "Pindah ke monitoring": "Move to monitoring", "Tandai selesai": "Mark as done",
  "Update progres": "Update progress", "Catat tindakan": "Log action", "Tabel tindakan (per jam)": "Action table (hourly)", "Tindakan hari ini...": "Today's actions...", "Isi tindakan dulu": "Enter an action first",
  "Bagian yang diperbaiki": "Part fixed", "Bagian yang bermasalah": "Problem area", "Solusi Penanganan": "Handling Solution", "Solusi penanganan": "Handling solution", "Solusi:": "Solution:",
  "Isi solusi penanganan": "Enter the handling solution", "Isi solusi penanganan dulu, lalu klik Tandai selesai": "Enter the handling solution first, then click Mark as done",
  "Tiket selesai, solusi masuk riwayat penanganan": "Ticket resolved, solution added to handling history", "Progres tercatat & terkirim ke admin": "Progress recorded & sent to admin",
  "Solusi dari tiket yang sudah selesai, supaya teknisi berikutnya tidak mulai dari nol.": "Solutions from resolved tickets, so the next technician does not start from scratch.",
  "Belum ada riwayat solusi untuk filter ini.": "No solution history for this filter yet.", "Belum ada riwayat": "No history yet",
  "Cari solusi, bagian, atau teknisi...": "Search solutions, parts, or technicians...", "Cari aduan...": "Search complaints...", "Cari bantuan, kata kunci, atau nomor tiket...": "Search help, keywords, or ticket number...",
  "Tulis langkah yang dilakukan sampai masalah teratasi, supaya teknisi berikutnya bisa mengulanginya.": "Write the steps taken until the problem was solved, so the next technician can repeat them.",
  "Sebutkan bagian yang diperbaiki, mis. printer lab atau jaringan WiFi": "Name the part fixed, e.g. lab printer or WiFi network",
  "Terisi otomatis dari akun yang login. Tambahkan nama lain jika ditangani bersama.": "Filled automatically from the logged-in account. Add other names if handled together.",
  "Ditangani oleh": "Handled by", "Dokumentasi Perbaikan": "Repair Documentation", "Belum ada foto": "No photos yet", "Sebelum": "Before", "Sesudah": "After",
  /* klien: aduan */
  "Cukup 4 isian, sisanya kami yang tangani.": "Just 4 fields, we handle the rest.", "Sebelum mengajukan aduan, pastikan Anda sudah menyiapkan data yang diperlukan agar proses lebih cepat.": "Before submitting a complaint, make sure you have the required data ready so the process is faster.",
  "Jenis bantuan": "Type of help", "Judul Aduan": "Complaint Title", "Ceritakan singkat": "Briefly describe", "Apa yang terjadi?": "What happened?", "Screenshot (opsional)": "Screenshot (optional)",
  "Sebutkan bagian/keluhan Anda": "Name the part/problem", "Keluhan lainnya apa? (wajib diisi)": "What other problem? (required)", "Isi cerita singkat dulu": "Write a short description first",
  "Aduan terkirim ke admin": "Complaint sent to admin", "Klik aduan untuk melihat perkembangan.": "Click a complaint to see its progress.", "Belum ada aduan.": "No complaints yet.",
  "Teruskan aduan ke teknisi yang tepat.": "Forward complaints to the right technician.", "Tetapkan prioritas": "Set priority", "Teruskan": "Forward", "Teruskan ke teknisi": "Forward to technician",
  "Pilih teknisi": "Select technician", "Atur teknisi": "Assign technician", "Buat & tugaskan": "Create & assign", "Setujui": "Approve", "Tolak": "Reject", "Ambil proyek": "Take project",
  "Pilih teknisi yang menangani": "Select the handling technician", "Teknisi ditugaskan": "Technician assigned", "Teknisi ditugaskan:": "Technician assigned:", "Tugaskan teknisi dulu sebelum menyetujui": "Assign a technician before approving",
  "Prioritas:": "Priority:", "Status:": "Status:", "Pelapor:": "Reporter:", "Teknisi:": "Technician:", "Nomor admin:": "Admin number:", "Aduan dikirim": "Complaint submitted", "Aduan masuk": "Incoming complaints",
  "Hubungi admin lewat Tiket Konsultasi sebelum aduan diteruskan ke teknisi.": "Contact the admin via a Consultation Ticket before the complaint is forwarded to a technician.",
  "Apakah aduan Anda terselesaikan?": "Was your complaint resolved?", "Bagaimana penanganannya?": "How was the handling?", "Belum memberi penilaian.": "No rating yet.",
  "Pelapor tiket ini": "Reporter of this ticket", "Kode Tiket": "Ticket Code", "Kode": "Code", "Kode Instansi": "Institution Code", "Instansi": "Institution", "Lampiran": "Attachment", "Tidak ada lampiran": "No attachment",
  "Waktu masuk": "Time received", "Waktu penyelesaian": "Completion time", "Tanggal Masuk": "Date Received", "Tanggal Selesai": "Date Completed", "Judul": "Title", "Deskripsi": "Description", "Catatan": "Notes",
  /* kolom & status */
  "Status": "Status", "Prioritas": "Priority", "Teknisi": "Technician", "Pelapor": "Reporter", "Modul": "Module", "Kategori": "Category", "Tanggal": "Date", "Jam": "Time", "Periode": "Period", "Topik": "Topic", "Pengaju": "Submitted by",
  "Penanganan": "Handling", "Oleh": "By", "Hasil": "Result", "Durasi": "Duration", "Jumlah": "Count", "Total": "Total", "No": "No", "Semua": "All", "Semua tanggal": "All dates", "Tanggal tertentu": "Specific date",
  "Baru": "New", "Diproses": "In progress", "Monitoring": "Monitoring", "Selesai": "Done", "Menunggu": "Pending", "Ditolak": "Rejected", "Ditutup": "Closed", "Terjadwal": "Scheduled", "Dalam Proses": "In Progress", "Berjalan": "Running",
  "Sedang diproses": "Being processed", "Sedang dikerjakan": "Being worked on", "Sedang berjalan": "In progress", "Belum ditugaskan": "Not assigned", "belum ditugaskan": "not assigned", "Belum ditangani tim": "Not yet handled by the team",
  "Rendah": "Low", "Sedang": "Medium", "Tinggi": "High", "Urgent": "Urgent", "Prioritas Tinggi": "High Priority", "Hampir penuh": "Almost full", "Penuh": "Full",
  "Gangguan / Error": "Issue / Error", "Gangguan": "Issue", "Pengembangan / Update Fitur": "Feature Development / Update", "Minta fitur baru": "Request a new feature", "Ajukan pertanyaan atau minta bantuan": "Ask a question or request help",
  "Database": "Database", "Server": "Server", "Jaringan": "Network", "Login / Akun": "Login / Account", "Akun & login": "Account & login", "Tampilan": "Display", "Tampilan (CSS)": "Display (CSS)", "Konfigurasi": "Configuration",
  "Lainnya": "Others", "Pembayaran": "Payment", "Server & Jaringan": "Server & Network", "Frontend": "Frontend", "Bagian lainnya": "Other parts", "Program bermasalah": "Problematic program",
  /* konsultasi */
  "Jadwal": "Schedule", "Jadwal Konsultasi": "Consultation Schedule", "Ajukan jadwal": "Request a schedule", "Permintaan Jadwal": "Schedule Requests", "Daftar konsultasi": "Consultation list",
  "Tanya Langsung": "Ask Directly", "Konsultasi dengan tim kami secara real-time lewat WhatsApp.": "Consult our team in real time via WhatsApp.", "Mulai Chat": "Start Chat", "Chat via WhatsApp": "Chat via WhatsApp",
  "Tiket Konsultasi": "Consultation Ticket", "Ajukan pertanyaan atau keluhan dalam bentuk tiket.": "Submit questions or complaints as a ticket.", "Buat Tiket": "Create Ticket",
  "Hubungi admin kami melalui WhatsApp.": "Contact our admin via WhatsApp.", "Hubungi admin Disty Teknologi melalui WhatsApp.": "Contact the Disty Teknologi admin via WhatsApp.", "Salin nomor": "Copy number", "Nomor disalin": "Number copied",
  "Silakan pilih metode konsultasi yang ingin Anda gunakan.": "Please choose the consultation method you want to use.", "Belum ada konsultasi": "No consultations yet", "Belum pernah mengajukan konsultasi.": "You have not requested a consultation yet.",
  "Permintaan jadwal dari klien. Klik baris untuk membuka percakapan.": "Schedule requests from clients. Click a row to open the conversation.", "Riwayat Percakapan": "Conversation History", "Tulis balasan...": "Write a reply...", "Tulis balasan dulu": "Write a reply first",
  "Pilih tanggal dulu": "Choose a date first", "Pilih jam yang masih tersedia": "Choose an available time", "Isi topik dulu": "Enter a topic first", "Permintaan dikirim ke admin": "Request sent to admin", "Tanggal & jam": "Date & time",
  "Kuota Jadwal Konsultasi": "Consultation Schedule Quota", "Kuota Jadwal": "Schedule Quota", "Atur kuota tiap jam konsultasi yang bisa dipilih klien.": "Set the quota for each consultation hour clients can choose.",
  "Tentukan berapa permintaan yang bisa masuk di tiap jam. Isi 0 untuk menutup jam itu.": "Set how many requests can come in each hour. Enter 0 to close that hour.", "Kembalikan ke default": "Reset to default",
  "Kuota tanggal ini kembali ke default": "This date's quota was reset to default", "Kuota jadwal sudah penuh": "The schedule quota is full", "Jadwal ditutup admin": "Schedule closed by admin",
  "Kuota default berlaku untuk semua tanggal yang belum punya kuota khusus.": "The default quota applies to all dates without a special quota.", "Kuota khusus hanya berlaku untuk tanggal yang dipilih.": "A special quota applies only to the selected date.",
  /* admin */
  "Beban kerja saat ini.": "Current workload.", "Tambah teknisi baru": "Add new technician", "Nama teknisi": "Technician name", "Nama teknisi baru": "New technician name", "Spesialisasi": "Specialization", "Spesialisasi (mis. Database)": "Specialization (e.g. Database)",
  "Isi nama teknisi": "Enter technician name", "Isi nama teknisi baru": "Enter new technician name", "Teknisi ditambahkan": "Technician added", "+ Tambah teknisi": "+ Add technician",
  "Daftar pelapor": "Reporter list", "Aduan belum selesai": "Unresolved complaints", "Aduan selesai": "Resolved complaints", "Total Aduan": "Total Complaints", "Total aduan": "Total complaints", "Jumlah aduan": "Number of complaints", "Jumlah konsultasi": "Number of consultations",
  "Aduan per modul": "Complaints per module", "Konsultasi per status": "Consultations per status", "Keluhan paling sering": "Most frequent problems", "Rata-rata nilai": "Average rating", "Rata-rata penyelesaian:": "Average resolution:",
  "Rincian SLA per aduan": "SLA details per complaint", "SLA tercapai": "SLA met", "SLA tercapai (%)": "SLA met (%)", "SLA waktu penyelesaian": "Resolution time SLA", "Target SLA": "SLA Target", "Target (jam)": "Target (hours)", "Target": "Target", "Aktual": "Actual",
  "Tepat waktu": "On time", "Terlambat": "Late", "Tercapai": "Achieved", "Sisa": "Remaining", "Ringkasan": "Summary", "Tidak ada aduan pada bulan ini": "No complaints this month", "Tidak ada konsultasi pada bulan ini": "No consultations this month",
  "Tidak ada aduan pada periode ini.": "No complaints in this period.", "Belum ada aduan pada periode ini.": "No complaints in this period yet.", "Belum ada konsultasi pada periode ini.": "No consultations in this period yet.", "Belum ada data": "No data yet",
  "Dihitung berdasarkan tanggal jadwal terakhir.": "Calculated based on the last schedule date.", "Laporan rapi, siap dibaca dan dicetak": "Neat reports, ready to read and print", "Data tabel untuk dibuka di Excel": "Table data to open in Excel",
  "Laporan PDF diunduh": "PDF report downloaded", "Laporan CSV diunduh": "CSV report downloaded", "dengan menu yang seragam.": "with a consistent menu.", "Laporan yang telah Anda ajukan": "Complaints you have submitted",
  /* survei */
  "Secara keseluruhan, seberapa puas Anda dengan layanan kami?": "Overall, how satisfied are you with our service?", "Nilai aspek layanan": "Rate service aspects", "Hanya butuh 1 menit. Masukan Anda membantu kami menjadi lebih baik.": "Takes only 1 minute. Your feedback helps us improve.",
  "Saran atau komentar (opsional)": "Suggestions or comments (optional)", "Tulis saran atau kritik Anda di sini...": "Write your suggestions or criticism here...", "Kecepatan respon tim": "Team response speed", "Kualitas penanganan teknisi": "Technician handling quality",
  "Kemudahan menggunakan Disty Desk": "Ease of using Disty Desk", "Sangat baik": "Excellent", "Baik": "Good", "Cukup": "Fair", "Kurang": "Poor", "Sangat kurang": "Very poor", "Pilih 1 sampai 5 bintang": "Choose 1 to 5 stars",
  "Pilih penilaian keseluruhan dulu": "Choose the overall rating first", "Terima kasih atas penilaiannya": "Thank you for your rating", "Terima kasih atas penilaian Anda!": "Thank you for your rating!", "Terima kasih! Survei Anda sudah terkirim": "Thank you! Your survey has been submitted",
  "Terus bantu kami menjadi lebih baik!": "Keep helping us improve!", "Penilaian": "Rating",
  /* pengaturan akun: tema & kata sandi */
  "Pilih Tema": "Choose Theme", "Terang": "Light", "Gelap": "Dark", "Ikuti sistem": "Follow system", "Latar putih, nyaman di ruangan terang": "White background, comfortable in bright rooms",
  "Latar gelap, nyaman di mata saat malam": "Dark background, easier on the eyes at night", "Mengikuti pengaturan perangkat Anda": "Follows your device settings",
  "Kata sandi saat ini": "Current password", "Kata sandi baru": "New password", "Ulangi kata sandi baru": "Repeat new password", "Simpan": "Save",
  "Minimal 8 karakter, mengandung huruf dan angka.": "At least 8 characters, containing letters and numbers.", "Kata sandi berhasil diubah": "Password changed successfully",
  "Isi kata sandi saat ini": "Enter your current password", "Kata sandi baru minimal 8 karakter dan mengandung huruf serta angka": "The new password must be at least 8 characters and contain letters and numbers",
  "Kata sandi baru harus berbeda dari yang lama": "The new password must be different from the old one", "Konfirmasi kata sandi tidak sama": "Password confirmation does not match",
  "Kata sandi saat ini salah": "Current password is incorrect", "Email atau kata sandi salah": "Incorrect email or password",
  /* unggah foto */
  "Foto tersimpan": "Photo saved", "Foto dihapus": "Photo removed", "Foto profil tersimpan": "Profile photo saved",
  "Pilih file gambar (JPG, PNG, atau WEBP)": "Choose an image file (JPG, PNG, or WEBP)", "Ukuran foto maksimal 15 MB": "Maximum photo size is 15 MB",
  "Berkas itu bukan gambar yang bisa dibaca": "That file is not an image that can be read", "Foto tidak bisa diproses": "The photo could not be processed",
  "Foto tidak dikenal, silakan unggah ulang": "Photo not recognized, please upload it again", "Pilih foto dulu": "Choose a photo first",
  "Foto harus berformat JPG, PNG, WEBP, atau GIF": "Photo must be JPG, PNG, WEBP, or GIF", "Ukuran foto maksimal 5 MB": "Maximum photo size is 5 MB",
  "Penyimpanan browser penuh. Hapus beberapa foto lama lalu coba lagi.": "Browser storage is full. Delete some old photos and try again.",
  "Tidak ada foto yang diubah": "No photo was changed", "Unggah foto sebelum": "Upload before photo", "Unggah foto sesudah": "Upload after photo", "Klik untuk unggah gambar": "Click to upload an image",
  /* bulan */
  "Januari": "January", "Februari": "February", "Maret": "March", "Mei": "May", "Juni": "June", "Juli": "July", "Agustus": "August", "Oktober": "October", "Desember": "December", "Agu": "Aug", "Okt": "Oct", "Des": "Dec"
};
const BLN_EN = { Agu: 'Aug', Okt: 'Oct', Des: 'Dec', Mei: 'May', Agustus: 'August', Oktober: 'October', Desember: 'December', Januari: 'January', Februari: 'February', Maret: 'March', Juni: 'June', Juli: 'July' };
const POLA_EN = [
  [/^(\d+) aduan aktif$/, (_, n) => n + ' active complaints'],
  [/^(\d+) pelapor terdaftar$/, (_, n) => n + ' registered reporters'],
  [/^(Pelapor|Teknisi|Solusi|Prioritas|Status|Nomor admin|Teknisi ditugaskan|Rata-rata penyelesaian):\s*(.*)$/, (_, k, v) => ({ 'Pelapor': 'Reporter', 'Teknisi': 'Technician', 'Solusi': 'Solution', 'Prioritas': 'Priority', 'Status': 'Status', 'Nomor admin': 'Admin number', 'Teknisi ditugaskan': 'Technician assigned', 'Rata-rata penyelesaian': 'Average resolution' })[k] + ': ' + (terjemah(v) || v)],
  [/^(\d{1,2}) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des) (\d{4})(.*)$/, (_, d, b, y, s) => d + ' ' + (BLN_EN[b] || b) + ' ' + y + s],
  [/^(\d{1,2}) (Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember) (\d{4})$/, (_, d, b, y) => (BLN_EN[b] || b) + ' ' + d + ', ' + y],
  [/^(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember) (\d{4})$/, (_, b, y) => (BLN_EN[b] || b) + ' ' + y],
  [/^(\d+) (jam|menit|hari)$/, (_, n, u) => n + ' ' + ({ jam: 'hours', menit: 'minutes', hari: 'days' })[u]]
];
/* Mengembalikan terjemahan English dari teks Indonesia, atau undefined bila tidak ada padanannya. Spasi di awal/akhir dipertahankan. */
function terjemah(teks) {
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(teks), inti = m[2];
  if (!inti) return undefined;
  let h = Object.prototype.hasOwnProperty.call(EN, inti) ? EN[inti] : undefined;
  if (h === undefined) for (const [re, fn] of POLA_EN) { const x = re.exec(inti); if (x) { h = fn(...x); break; } }
  return h === undefined ? undefined : m[1] + h + m[3];
}

const ATRIBUT_TERJEMAH = ['placeholder', 'aria-label', 'title', 'alt'];
const LEWATI = 'script,style,textarea,#spc,[data-no-i18n]'; // #spc: chip "Bagian yang diperbaiki" dibaca kodenya lewat textContent, jangan diubah
function terapkanBahasa(akar) {
  if (bahasa !== 'en' || !akar) return;
  const ganti = n => { const t = terjemah(n.nodeValue); if (t !== undefined && t !== n.nodeValue) n.nodeValue = t; };
  if (akar.nodeType === 3) { if (!akar.parentElement || !akar.parentElement.closest(LEWATI)) ganti(akar); return; }
  if (akar.nodeType !== 1 || akar.closest(LEWATI)) return;
  const w = document.createTreeWalker(akar, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) if (!n.parentElement.closest(LEWATI)) ganti(n);
  const els = [akar, ...akar.querySelectorAll('[placeholder],[aria-label],[title],[alt]')];
  els.forEach(el => ATRIBUT_TERJEMAH.forEach(a => {
    if (!el.hasAttribute || !el.hasAttribute(a) || el.closest(LEWATI)) return;
    const t = terjemah(el.getAttribute(a)); if (t !== undefined) el.setAttribute(a, t);
  }));
}
function terjemahJudul() {
  if (bahasa !== 'en') return;
  const j = document.title.split(' · ').map(p => terjemah(p) ?? p).join(' · ');
  if (j !== document.title) document.title = j;
}
new MutationObserver(ms => { if (bahasa === 'en') ms.forEach(m => m.addedNodes.forEach(terapkanBahasa)); })
  .observe(document.body, { childList: true, subtree: true });
new MutationObserver(terjemahJudul).observe(document.querySelector('title'), { childList: true });
document.documentElement.lang = bahasa;
terapkanBahasa(document.body); terjemahJudul();

/* Ganti bahasa: simpan pilihan, lalu gambar ulang halaman yang sedang tampil (profil tetap terbuka). */
function setBahasa(b) {
  bahasa = b === 'en' ? 'en' : 'id';
  try { localStorage.setItem(KUNCI_BAHASA, bahasa); } catch {}
  document.documentElement.lang = bahasa;
  document.getElementById('bhs')?.remove();
  if (role) render();
  else if (document.getElementById('em')) login();
  else landing();
  terjemahJudul();
}
/* Dialog pilihan bahasa (dibuka dari Profil > Pengaturan Akun > Bahasa). */
function pilihBahasa() {
  document.getElementById('bhs')?.remove();
  const o = document.createElement('div');
  o.id = 'bhs'; o.className = 'ibk';
  o.onclick = e => { if (e.target === o) o.remove(); };
  const opsi = [['id', 'Bahasa Indonesia'], ['en', 'English']];
  o.innerHTML = `<div class="ibx" role="dialog" aria-modal="true" aria-labelledby="bhst"><div class="ibh" id="bhst">Pilih Bahasa</div><div class="ibm tw-pt-0">${opsi.map(([k, n]) =>
    `<button type="button" class="sr2" data-no-i18n onclick="setBahasa('${k}')" style="border-radius:12px;margin-top:8px;border:1px solid var(--line);padding:12px 14px"><div><b>${n}</b></div>${bahasa === k ? ic('check', 18) : ''}</button>`).join('')}</div><div class="ibf"><button type="button" class="ibb" onclick="document.getElementById('bhs').remove()">Tutup</button></div></div>`;
  document.body.appendChild(o);
}
document.addEventListener('keydown', e => { if (e.key == 'Escape') document.getElementById('bhs')?.remove(); });
