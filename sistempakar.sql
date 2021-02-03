-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 31 Jan 2021 pada 13.26
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistempakar`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `gejala`
--

CREATE TABLE `gejala` (
  `id_gejala` varchar(5) NOT NULL,
  `nama_gejala` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `gejala`
--

INSERT INTO `gejala` (`id_gejala`, `nama_gejala`) VALUES
('GJ001', 'Tidak bisa charge'),
('GJ002', 'USB tidak terdeteksi'),
('GJ003', 'Ghost Touch'),
('GJ004', 'Tidak responsive'),
('GJ005', 'Layar hitam'),
('GJ006', 'Bintik hitam pada layar'),
('GJ007', 'BootLoop'),
('GJ008', 'Hape restart / mati'),
('GJ009', 'Tidak bisa install ulang');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kerusakan`
--

CREATE TABLE `kerusakan` (
  `id_rusak` varchar(5) NOT NULL,
  `nama_rusak` varchar(20) DEFAULT NULL,
  `solusi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kerusakan`
--

INSERT INTO `kerusakan` (`id_rusak`, `nama_rusak`, `solusi`) VALUES
('KR01', 'IC Charger', 'dilakukan penggantian ic charger, biaya sekitar 10-100rb tergantung merk hp yang digunakan'),
('KR02', 'Touchscreen', 'lepas screen protector lakukan pembersihan pada layar dengan tisu secara perlahan, lalu coba sentuh Kembali. Jika masih tidak berfungsi lakukan restart. Namun jika masih tidak berfungsi bawa ketempat service untuk pemeriksaan lebih lanjut, jika diperlukan penggantian touchscreen maka dibutuhkan biaya sekitar 300-500rb'),
('KR03', 'IC LED', 'pemeriksaan langsung pada service center dikarenakan cukup rumit'),
('KR04', 'EMMC', 'Silahkan bawa ke service center untuk dilakukan penggantian Emmc, biaya yang dibutuhkan sekitar 200-700rb tergantung merk hp'),
('KR05', 'Battery', 'diperlukan penggantian baterai sesuai dengan jenis hape yang digunakan, usahakan beli baterai yang memiliki kapasitas sama dengan baterai original untuk hp yg digunakan agar lebih kompatibel');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pertanyaan`
--

CREATE TABLE `pertanyaan` (
  `id` int(11) NOT NULL,
  `tanya_awal` varchar(5) DEFAULT NULL,
  `ya` varchar(10) DEFAULT NULL,
  `tidak` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pertanyaan`
--

INSERT INTO `pertanyaan` (`id`, `tanya_awal`, `ya`, `tidak`) VALUES
(1, 'GJ001', 'GJ002', 'GJ003'),
(2, 'GJ002', 'KR01', 'KR05'),
(3, 'GJ003', 'GJ004', 'GJ005'),
(4, 'GJ004', 'KR02', 'NONE'),
(5, 'GJ005', 'GJ006', 'GJ007'),
(6, 'GJ006', 'KR03', 'NONE'),
(7, 'GJ007', 'GJ008', 'NONE'),
(8, 'GJ008', 'GJ009', 'NONE'),
(9, 'GJ009', 'KR04', 'NONE');

-- --------------------------------------------------------

--
-- Struktur dari tabel `useradmin`
--

CREATE TABLE `useradmin` (
  `id` int(11) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `useradmin`
--

INSERT INTO `useradmin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `gejala`
--
ALTER TABLE `gejala`
  ADD PRIMARY KEY (`id_gejala`);

--
-- Indeks untuk tabel `kerusakan`
--
ALTER TABLE `kerusakan`
  ADD PRIMARY KEY (`id_rusak`);

--
-- Indeks untuk tabel `pertanyaan`
--
ALTER TABLE `pertanyaan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_gejala` (`tanya_awal`);

--
-- Indeks untuk tabel `useradmin`
--
ALTER TABLE `useradmin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `pertanyaan`
--
ALTER TABLE `pertanyaan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `useradmin`
--
ALTER TABLE `useradmin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `pertanyaan`
--
ALTER TABLE `pertanyaan`
  ADD CONSTRAINT `fk_gejala` FOREIGN KEY (`tanya_awal`) REFERENCES `gejala` (`id_gejala`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
