// Ambil elemen canvas dari dokumen HTML berdasarkan id 'bubbleChart'
const canvas = document.getElementById('bubbleChart');

// Dapatkan context 2D dari canvas untuk menggambar
const ctx = canvas.getContext('2d');

// Padding adalah jarak antara tepi canvas dan area grafik
const padding = 80;

// Hitung lebar area grafik (dalam satuan piksel)
const chartWidth = canvas.width - padding * 2;

// Hitung tinggi area grafik
const chartHeight = canvas.height - padding * 2;

// Data Mahasiswa berisi ID, nilai CPMK071, CPMK072, dan total akhir
const dataMahasiswa = [
  {id: 2101020014, cpmk071: 70, cpmk072: 70, total: 70},
  {id: 2101020024, cpmk071: 65, cpmk072: 90, total: 85},
  {id: 2101020048, cpmk071: 45, cpmk072: 50, total: 49},
  {id: 2101020058, cpmk071: 70, cpmk072: 70, total: 70},
  {id: 2101020074, cpmk071: 65, cpmk072: 70, total: 69},
  {id: 2101020092, cpmk071: 45, cpmk072: 50, total: 49},
  {id: 2101020103, cpmk071: 10, cpmk072: 40, total: 34},
  {id: 2101020104, cpmk071: 45, cpmk072: 70, total: 65},
  {id: 2101020117, cpmk071: 45, cpmk072: 70, total: 65},
  {id: 2201020001, cpmk071: 65, cpmk072: 70, total: 69},
  {id: 2201020002, cpmk071: 65, cpmk072: 90, total: 85},
  {id: 2201020010, cpmk071: 65, cpmk072: 90, total: 85},
  {id: 2201020014, cpmk071: 65, cpmk072: 90, total: 85},
  {id: 2201020015, cpmk071: 70, cpmk072: 70, total: 70},
  {id: 2201020018, cpmk071: 65, cpmk072: 70, total: 69},
  {id: 2201020019, cpmk071: 70, cpmk072: 70, total: 70},
  {id: 2201020022, cpmk071: 65, cpmk072: 50, total: 53},
  {id: 2201020026, cpmk071: 65, cpmk072: 90, total: 85},
  {id: 2201020032, cpmk071: 65, cpmk072: 50, total: 53},
  {id: 2201020039, cpmk071: 65, cpmk072: 50, total: 53},
  {id: 2201020041, cpmk071: 70, cpmk072: 70, total: 70},
  {id: 2201020047, cpmk071: 45, cpmk072: 50, total: 49},
  {id: 2201020048, cpmk071: 70, cpmk072: 70, total: 70},
  {id: 2201020057, cpmk071: 65, cpmk072: 50, total: 53},
  {id: 2201020063, cpmk071: 65, cpmk072: 70, total: 69},
  {id: 2201020065, cpmk071: 75, cpmk072: 80, total: 79},
  {id: 2201020066, cpmk071: 65, cpmk072: 70, total: 69},
  {id: 2201020067, cpmk071: 65, cpmk072: 50, total: 53},
  {id: 2201020070, cpmk071: 75, cpmk072: 80, total: 79},
  {id: 2201020074, cpmk071: 65, cpmk072: 70, total: 69},
  {id: 2201020075, cpmk071: 65, cpmk072: 70, total: 69},
  {id: 2201020083, cpmk071: 65, cpmk072: 70, total: 69},
  {id: 2201020086, cpmk071: 0, cpmk072: 0, total: 0},
  {id: 2201020090, cpmk071: 70, cpmk072: 70, total: 70},
  {id: 2201020091, cpmk071: 60, cpmk072: 70, total: 68},
  {id: 2201020092, cpmk071: 65, cpmk072: 70, total: 69},
  {id: 2201020093, cpmk071: 65, cpmk072: 70, total: 69},
  {id: 2201020094, cpmk071: 65, cpmk072: 50, total: 53},
  {id: 2201020095, cpmk071: 65, cpmk072: 70, total: 69},
  {id: 2201020098, cpmk071: 65, cpmk072: 90, total: 85},
  {id: 2201020099, cpmk071: 65, cpmk072: 90, total: 85},
  {id: 2201020100, cpmk071: 70, cpmk072: 70, total: 70},
  {id: 2201020103, cpmk071: 70, cpmk072: 70, total: 70},
  {id: 2201020104, cpmk071: 70, cpmk072: 70, total: 70},
  {id: 2201020105, cpmk071: 65, cpmk072: 90, total: 85},
  {id: 2201020106, cpmk071: 70, cpmk072: 70, total: 70},
  {id: 2201020109, cpmk071: 70, cpmk072: 70, total: 70},
  {id: 2201020112, cpmk071: 60, cpmk072: 70, total: 68},
  {id: 2201020116, cpmk071: 65, cpmk072: 50, total: 53},
  {id: 2201020117, cpmk071: 65, cpmk072: 70, total: 69},
  {id: 2201020118, cpmk071: 65, cpmk072: 90, total: 85},
  {id: 2201020122, cpmk071: 70, cpmk072: 70, total: 70},
  {id: 2201020123, cpmk071: 60, cpmk072: 70, total: 68}
];


// Batas minimum dan maksimum untuk sumbu X, Y, dan ukuran bubble (total)
const minX = 0, maxX = 100;
const minY = 0, maxY = 100;
const minTotal = 40, maxTotal = 100;

// Fungsi untuk mengubah nilai asli menjadi skala grafik (dalam piksel)
function normalize(value, min, max, range) {
  return ((value - min) / (max - min)) * range;
}

// Fungsi menggambar grid kartesius agar posisi titik lebih jelas
function drawGrid() {
  ctx.strokeStyle = '#ddd'; // Warna abu-abu terang untuk grid
  ctx.lineWidth = 1;

  // Garis vertikal (sejajar sumbu Y)
  for (let x = 0; x <= 100; x += 10) {
    const posX = normalize(x, minX, maxX, chartWidth) + padding;
    ctx.beginPath();
    ctx.moveTo(posX, padding);
    ctx.lineTo(posX, canvas.height - padding);
    ctx.stroke();
  }

  // Garis horizontal (sejajar sumbu X)
  for (let y = 0; y <= 100; y += 10) {
    const posY = canvas.height - (normalize(y, minY, maxY, chartHeight) + padding);
    ctx.beginPath();
    ctx.moveTo(padding, posY);
    ctx.lineTo(canvas.width - padding, posY);
    ctx.stroke();
  }
}

// Fungsi menggambar sumbu X dan Y beserta skala-nya
function drawAxis() {
  ctx.strokeStyle = '#333';     // Warna garis sumbu
  ctx.lineWidth = 2;            // Ketebalan garis

  // Gambar sumbu X (horizontal)
  ctx.beginPath();
  ctx.moveTo(padding, canvas.height - padding);  // Mulai dari kiri bawah
  ctx.lineTo(canvas.width - padding, canvas.height - padding);  // ke kanan bawah
  ctx.stroke();

  // Gambar sumbu Y (vertikal)
  ctx.beginPath();
  ctx.moveTo(padding, canvas.height - padding);  // Mulai dari kiri bawah
  ctx.lineTo(padding, padding);  // ke atas
  ctx.stroke();

  // Tambahkan label untuk sumbu X dan Y
  ctx.fillStyle = '#000';
  ctx.font = '14px Arial';
  ctx.fillText("CPMK 071", canvas.width / 2, canvas.height - 20); // Label sumbu X

  // Rotasi teks label sumbu Y agar vertikal
  ctx.save();
  ctx.translate(20, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("CPMK 072", 0, 0); // Label sumbu Y
  ctx.restore();

  // Tambahkan angka skala untuk sumbu X
  for (let x = 0; x <= 100; x += 10) {
    const posX = normalize(x, minX, maxX, chartWidth) + padding;
    ctx.fillText(x, posX - 10, canvas.height - padding + 20); // Tampilkan angka
    ctx.beginPath();
    ctx.moveTo(posX, canvas.height - padding - 5); // Garis kecil di sumbu
    ctx.lineTo(posX, canvas.height - padding + 5);
    ctx.stroke();
  }

  // Tambahkan angka skala untuk sumbu Y
  for (let y = 0; y <= 100; y += 10) {
    const posY = canvas.height - (normalize(y, minY, maxY, chartHeight) + padding);
    ctx.fillText(y, padding - 35, posY + 5); // Tampilkan angka
    ctx.beginPath();
    ctx.moveTo(padding - 5, posY); // Garis kecil di sumbu
    ctx.lineTo(padding + 5, posY);
    ctx.stroke();
  }
}

// Fungsi menggambar bubble chart berdasarkan data mahasiswa
function drawBubbles(data) {
  data.forEach(mhs => {
    // Posisi X berdasarkan nilai CPMK071
    const x = normalize(mhs.cpmk071, minX, maxX, chartWidth) + padding;
    
    // Posisi Y berdasarkan nilai CPMK072 (dibalik karena canvas 0,0 di kiri atas)
    const y = canvas.height - (normalize(mhs.cpmk072, minY, maxY, chartHeight) + padding);
    
    // Radius bubble berdasarkan gabungan posisi X dan Y (semakin kanan atas, semakin besar)
    const r = normalize((mhs.cpmk071 + mhs.cpmk072) / 2, minX, maxX, 40) + 10;

    // Atur warna bubble: hijau jika lulus (>=70), merah jika tidak
    if (mhs.total >= 70) {
      ctx.fillStyle = 'rgba(40, 167, 69, 0.6)'; // Hijau transparan
    } else {
      ctx.fillStyle = 'rgba(220, 53, 69, 0.6)'; // Merah transparan
    }

    // Gambar bubble (lingkaran)
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.stroke();

    // Tampilkan ID mahasiswa di atas bubble
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText(mhs.id, x - r / 2, y - r - 5);

    // Tampilkan total nilai di tengah bubble
    ctx.fillStyle = '#000';
    ctx.font = 'bold 12px Arial';
    ctx.fillText(mhs.total, x - 10, y + 4);
  });
}

function drawLegend() {
  const legendX = padding;
  const legendY = canvas.height - padding + 40;

  ctx.font = '14px Arial';
  ctx.textAlign = 'left';

  // Bubble hijau
  ctx.fillStyle = 'rgba(40, 167, 69, 0.6)';
  ctx.beginPath();
  ctx.arc(legendX + 10, legendY, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#000';
  ctx.fillText('= Lulus (Total >= 70)', legendX + 25, legendY + 5);

  // Bubble merah
  ctx.fillStyle = 'rgba(220, 53, 69, 0.6)';
  ctx.beginPath();
  ctx.arc(legendX + 220, legendY, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#000';
  ctx.fillText('= Tidak Lulus (Total < 70)', legendX + 235, legendY + 5);

  // Keterangan angka dalam bubble
  ctx.fillStyle = '#000';
  ctx.fillText('*Angka di tengah bubble = Nilai Total mahasiswa', legendX, legendY + 30);
}


// Jalankan fungsi untuk menggambar sumbu dan bubble ke canvas
drawGrid();
drawAxis();
drawBubbles(dataMahasiswa);
drawLegend();