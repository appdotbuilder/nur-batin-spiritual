import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Nur Batin - Aplikasi Spiritual Islam-Jawa">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900 dark:to-blue-900">
                {/* Header */}
                <header className="w-full p-4 lg:p-6">
                    <nav className="flex items-center justify-between max-w-6xl mx-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xl font-bold">🌙</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-emerald-800 dark:text-emerald-200">Nur Batin</h1>
                                <p className="text-sm text-emerald-600 dark:text-emerald-400">Spiritual Islam-Jawa</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border border-emerald-600 px-6 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900 transition-colors"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="max-w-6xl mx-auto px-4 lg:px-6 pb-12">
                    {/* Hero Section */}
                    <div className="text-center py-16">
                        <div className="mb-6">
                            <span className="text-6xl mb-4 block">🕌✨</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-emerald-800 dark:text-emerald-200 mb-6">
                            Nur Batin
                        </h1>
                        <p className="text-xl lg:text-2xl text-emerald-700 dark:text-emerald-300 mb-4">
                            Aplikasi Spiritual Islam-Jawa untuk Praktik Wirid & Deteksi Spiritual
                        </p>
                        <p className="text-lg text-emerald-600 dark:text-emerald-400 max-w-3xl mx-auto leading-relaxed">
                            Panduan wirid Islami dengan tradisi Jawa, simulasi deteksi gaib, dan bimbingan spiritual 
                            untuk memperkuat hubungan dengan Allah SWT
                        </p>
                        
                        {/* Disclaimer Banner */}
                        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-4xl mx-auto dark:bg-yellow-900 dark:border-yellow-700">
                            <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                                ⚠️ <strong>Penting:</strong> Gunakan aplikasi ini hanya dengan niat baik dan perlindungan dari Allah. 
                                Jangan digunakan untuk tujuan syirik, ria, atau pamer kekuatan gaib. 
                                Fitur deteksi adalah simulasi spiritual, bukan pengukuran ilmiah.
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {/* Wirid Feature */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📿</div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Bacaan Wirid</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Panduan wirid Islam-Jawa: Yaa Nur, Yaa Haqq, La Hawla, dan Asmaul Husna dengan feedback spiritual
                            </p>
                            <div className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                                ✓ Teks Arab & Latin<br/>
                                ✓ Makna & Manfaat<br/>
                                ✓ Audio Panduan*<br/>
                                ✓ Feedback Alignment
                            </div>
                        </div>

                        {/* Detection Feature */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">🔮</div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Deteksi Gaib</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Simulasi deteksi spiritual dengan peringatan dan respons doa perlindungan sesuai Islam
                            </p>
                            <div className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                                ✓ Radar Spiritual<br/>
                                ✓ Peringatan Entitas<br/>
                                ✓ Doa Perlindungan<br/>
                                ✓ Ayat Kursi Audio*
                            </div>
                        </div>

                        {/* Spiritual Camera */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Kamera Batin</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Fitur khusus untuk pembacaan aura dan frekuensi spiritual (akan datang)
                            </p>
                            <div className="text-amber-600 dark:text-amber-400 text-sm font-medium">
                                🚧 Dalam Pengembangan<br/>
                                ⏳ Segera Hadir<br/>
                                🔒 Perlu Izin Khusus<br/>
                                📋 Beta Testing
                            </div>
                        </div>

                        {/* History Log */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Log Spiritual</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Riwayat sesi wirid, deteksi, dan perkembangan spiritual Anda
                            </p>
                            <div className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                                ✓ Histori Wirid<br/>
                                ✓ Catatan Deteksi<br/>
                                ✓ Statistik Progress<br/>
                                ✓ Analisis Perkembangan
                            </div>
                        </div>
                    </div>

                    {/* App Preview */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-8">
                            Tampilan Aplikasi
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Home Screen Preview */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                                <div className="bg-emerald-100 dark:bg-emerald-900 rounded-lg p-4 mb-4">
                                    <div className="text-emerald-600 text-sm font-medium mb-2">Layar Utama</div>
                                    <div className="space-y-2">
                                        <div className="bg-emerald-200 dark:bg-emerald-700 rounded p-2 text-xs">🔓 Kamera Batin: [Siap]</div>
                                        <div className="bg-emerald-500 text-white rounded p-2 text-xs">📿 Bacaan Wirid: [Mulai]</div>
                                        <div className="bg-red-500 text-white rounded p-2 text-xs">🔮 Deteksi Gaib: [Radar]</div>
                                        <div className="bg-blue-500 text-white rounded p-2 text-xs">📊 Log Spiritual: [Lihat]</div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Interface utama dengan akses cepat semua fitur</p>
                            </div>

                            {/* Wirid Session Preview */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                                <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 mb-4">
                                    <div className="text-blue-600 text-sm font-medium mb-2">Sesi Wirid</div>
                                    <div className="space-y-2">
                                        <div className="bg-white dark:bg-gray-700 rounded p-2 text-xs">يَا نُورُ يَا نُورُ يَا نُورُ</div>
                                        <div className="bg-green-200 dark:bg-green-700 rounded p-1 text-xs">Alignment: 89%</div>
                                        <div className="bg-yellow-200 dark:bg-yellow-700 rounded p-1 text-xs">Aura: Balanced</div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Panduan wirid dengan feedback real-time</p>
                            </div>

                            {/* Detection Preview */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                                <div className="bg-red-100 dark:bg-red-900 rounded-lg p-4 mb-4">
                                    <div className="text-red-600 text-sm font-medium mb-2">Deteksi Aktif</div>
                                    <div className="space-y-2">
                                        <div className="bg-red-200 dark:bg-red-700 rounded p-2 text-xs">⚠️ Entitas Terdeteksi</div>
                                        <div className="bg-yellow-200 dark:bg-yellow-700 rounded p-1 text-xs">EMF: 67 μT</div>
                                        <div className="bg-green-500 text-white rounded p-2 text-xs">🤲 A'udzu billahi...</div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Deteksi dengan respons doa islami</p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center bg-emerald-600 rounded-2xl p-12 text-white">
                        <h2 className="text-3xl font-bold mb-4">Mulai Perjalanan Spiritual Anda</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Bergabunglah dengan komunitas spiritual yang mengamalkan wirid Islam-Jawa
                        </p>
                        
                        {auth.user ? (
                            <Link
                                href={route('spiritual.index')}
                                className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                🚀 Buka Aplikasi Spiritual
                            </Link>
                        ) : (
                            <div className="space-x-4">
                                <Link
                                    href={route('register')}
                                    className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    🌟 Daftar Sekarang
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
                                >
                                    🔑 Sudah Punya Akun
                                </Link>
                            </div>
                        )}
                        
                        <p className="text-sm mt-6 opacity-80">
                            * Fitur audio sedang dalam pengembangan | Barakallahu fiikum
                        </p>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-emerald-200 dark:border-emerald-700 py-8">
                    <div className="max-w-6xl mx-auto px-4 lg:px-6 text-center">
                        <p className="text-emerald-600 dark:text-emerald-400 mb-2">
                            <strong>Bismillahir Rahmanir Rahiim</strong>
                        </p>
                        <p className="text-sm text-emerald-500 dark:text-emerald-500">
                            Semoga Allah SWT senantiasa memberkahi dan melindungi kita semua
                        </p>
                        <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-700">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Built with ❤️ and 🤲 doa untuk kebaikan umat
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}