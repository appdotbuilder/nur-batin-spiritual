import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    stats: {
        totalSessions: number;
        detectionCount: number;
        lastSessionDate: string | null;
    };
    recentSessions: Array<{
        id: number;
        wirid_name: string;
        duration_minutes: number;
        status: string;
        created_at: string;
    }>;
    recentDetections: Array<{
        id: number;
        detection_type: string;
        entity_detected: boolean;
        created_at: string;
        location: string;
    }>;
    [key: string]: unknown;
}

export default function SpiritualIndex({ stats, recentSessions }: Props) {
    const [isScanning, setIsScanning] = useState(false);
    const [selectedWirid, setSelectedWirid] = useState('');

    const handleStartWirid = () => {
        if (!selectedWirid) {
            alert('Pilih jenis wirid terlebih dahulu');
            return;
        }

        router.post(route('spiritual.wirid.start'), {
            wirid_name: selectedWirid,
        });
    };

    const handleStartDetection = () => {
        setIsScanning(true);
        
        // Simulate scanning time
        setTimeout(() => {
            setIsScanning(false);
            router.post(route('spiritual.detect'), {
                location: 'Current Location',
            });
        }, 3000);
    };

    const wiridOptions = [
        { value: 'Yaa Nur', label: 'يَا نُورُ - Ya Nur (Cahaya)', description: 'Untuk mencerahkan hati' },
        { value: 'Yaa Haqq', label: 'يَا حَقُّ - Ya Haqq (Kebenaran)', description: 'Untuk keteguhan iman' },
        { value: 'La Hawla', label: 'لَا حَوْلَ وَلَا قُوَّةَ - La Hawla', description: 'Untuk kekuatan spiritual' },
        { value: 'Asmaul Husna', label: 'الْأَسْمَاءُ الْحُسْنَىٰ - Asmaul Husna', description: 'Nama-nama Allah yang indah' },
    ];

    return (
        <>
            <Head title="Nur Batin - Aplikasi Spiritual" />
            
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900 dark:to-blue-900">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-emerald-200 dark:border-emerald-700">
                    <div className="max-w-4xl mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white text-2xl">🌙</span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">Nur Batin</h1>
                                    <p className="text-emerald-600 dark:text-emerald-400">Aplikasi Spiritual Islam-Jawa</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Assalamu'alaikum Warahmatullahi Wabarakatuh
                                </p>
                                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                                    {new Date().toLocaleDateString('id-ID', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Stats Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">📿</span>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Sesi Wirid</h3>
                                    <p className="text-2xl font-bold text-emerald-600">{stats.totalSessions}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Terakhir: {stats.lastSessionDate || 'Belum pernah'}
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">🔮</span>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Deteksi</h3>
                                    <p className="text-2xl font-bold text-red-500">{stats.detectionCount}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Entitas terdeteksi</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">🕐</span>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Status</h3>
                                    <p className="text-lg font-bold text-green-500">Aktif</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Aplikasi siap digunakan</p>
                        </div>
                    </div>

                    {/* Main Features */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                        {/* Wirid Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-4xl">📿</span>
                                <div>
                                    <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">Bacaan Wirid</h2>
                                    <p className="text-emerald-600 dark:text-emerald-400">Pilih wirid untuk diamalkan</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                {wiridOptions.map((option) => (
                                    <label key={option.value} className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">
                                        <input
                                            type="radio"
                                            name="wirid"
                                            value={option.value}
                                            checked={selectedWirid === option.value}
                                            onChange={(e) => setSelectedWirid(e.target.value)}
                                            className="mt-1"
                                        />
                                        <div>
                                            <div className="font-semibold text-emerald-800 dark:text-emerald-200">{option.label}</div>
                                            <div className="text-sm text-emerald-600 dark:text-emerald-400">{option.description}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <Button
                                onClick={handleStartWirid}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg"
                                disabled={!selectedWirid}
                            >
                                🚀 Mulai Sesi Wirid
                            </Button>
                        </div>

                        {/* Detection Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-4xl">🔮</span>
                                <div>
                                    <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">Deteksi Gaib</h2>
                                    <p className="text-red-600 dark:text-red-400">Radar spiritual aktif</p>
                                </div>
                            </div>

                            <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-6 mb-6">
                                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Status Radar:</h3>
                                {isScanning ? (
                                    <div className="text-center">
                                        <div className="animate-pulse text-4xl mb-2">📡</div>
                                        <p className="text-red-600 dark:text-red-400 font-medium">Memindai lingkungan...</p>
                                        <div className="mt-4">
                                            <div className="bg-red-200 dark:bg-red-700 rounded-full h-2">
                                                <div className="bg-red-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-red-600 dark:text-red-400">🟢 Siap untuk deteksi</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                            Fitur ini mensimulasikan deteksi spiritual dan memberikan panduan doa perlindungan sesuai Islam.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={handleStartDetection}
                                disabled={isScanning}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
                            >
                                {isScanning ? '🔄 Memindai...' : '🔍 Aktifkan Radar'}
                            </Button>
                        </div>
                    </div>

                    {/* Additional Features */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Spiritual Camera */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg opacity-60">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">📱</span>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-400">Kamera Batin</h3>
                                    <p className="text-gray-500">Fitur premium - Segera hadir</p>
                                </div>
                            </div>
                            <div className="text-center py-4">
                                <p className="text-sm text-gray-500 mb-4">🚧 Dalam pengembangan</p>
                                <button disabled className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg cursor-not-allowed">
                                    🔒 Siap Dibuka...
                                </button>
                            </div>
                        </div>

                        {/* Spiritual Log */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">📊</span>
                                <div>
                                    <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">Log Spiritual</h3>
                                    <p className="text-blue-600 dark:text-blue-400">Riwayat aktivitas</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {recentSessions.slice(0, 2).map((session) => (
                                    <div key={session.id} className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                                        <div className="font-medium text-blue-800 dark:text-blue-200">
                                            📿 {session.wirid_name}
                                        </div>
                                        <div className="text-sm text-blue-600 dark:text-blue-400">
                                            {session.duration_minutes} menit - {new Date(session.created_at).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    onClick={() => router.visit(route('spiritual.history'))}
                                    variant="outline"
                                    className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
                                >
                                    📋 Lihat Semua Riwayat
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 dark:bg-yellow-900/30 dark:border-yellow-700">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">⚠️</span>
                            <div>
                                <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                                    Disclaimer Penting
                                </h4>
                                <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
                                    <strong>Gunakan aplikasi ini hanya dengan niat baik dan perlindungan dari Allah SWT.</strong> 
                                    Jangan digunakan untuk tujuan syirik, ria, atau pamer kekuatan gaib. 
                                    Fitur deteksi spiritual adalah simulasi untuk panduan spiritual, bukan pengukuran ilmiah. 
                                    Selalu ingat bahwa segala sesuatu terjadi atas izin Allah SWT.
                                </p>
                                <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-2 font-medium">
                                    "وَاللَّهُ أَعْلَمُ بِالصَّوَابِ" - Wallahu a'lam bis showab (Dan Allah lebih mengetahui yang benar)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}