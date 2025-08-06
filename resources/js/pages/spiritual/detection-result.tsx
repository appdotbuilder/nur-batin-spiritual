import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    log: {
        id: number;
        detection_type: string;
        entity_detected: boolean;
        location: string;
        created_at: string;
    };
    readings: {
        emf_level: number;
        spiritual_frequency: string;
        energy_disturbance: number;
        temperature_anomaly: string;
        magnetic_field: string;
    };
    entityDetected: boolean;
    recommendedResponse: string | null;
    protectionPrayers: Array<{
        name: string;
        arabic: string;
        latin: string;
        meaning: string;
    }>;
    [key: string]: unknown;
}

export default function DetectionResult({ 
    log, 
    readings, 
    entityDetected, 
    recommendedResponse, 
    protectionPrayers 
}: Props) {
    const [currentPrayerIndex, setCurrentPrayerIndex] = useState(0);
    const [isPlayingAyatKursi, setIsPlayingAyatKursi] = useState(false);
    const [showAllReadings, setShowAllReadings] = useState(false);

    const handlePlayAyatKursi = () => {
        setIsPlayingAyatKursi(true);
        // Simulate audio playing
        setTimeout(() => {
            setIsPlayingAyatKursi(false);
            alert('Audio Ayat Kursi selesai diputar (simulasi). Semoga mendapat perlindungan Allah SWT.');
        }, 3000);
    };

    const getReadingLevel = (value: number, max: number) => {
        const percentage = (value / max) * 100;
        if (percentage > 70) return { level: 'Tinggi', color: 'text-red-500 bg-red-100 dark:bg-red-900/30' };
        if (percentage > 40) return { level: 'Sedang', color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30' };
        return { level: 'Rendah', color: 'text-green-500 bg-green-100 dark:bg-green-900/30' };
    };

    const emfLevel = getReadingLevel(readings.emf_level, 100);
    const energyLevel = getReadingLevel(readings.energy_disturbance, 100);

    return (
        <>
            <Head title="Hasil Deteksi Spiritual" />
            
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900 dark:to-orange-900">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-red-200 dark:border-red-700">
                    <div className="max-w-4xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => router.visit(route('spiritual.index'))}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    ← Kembali
                                </button>
                                <div>
                                    <h1 className="text-xl font-bold text-red-800 dark:text-red-200">
                                        Hasil Deteksi Spiritual
                                    </h1>
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        {log.location} • {new Date(log.created_at).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-lg font-bold ${entityDetected ? 'text-red-600' : 'text-green-600'}`}>
                                    {entityDetected ? '⚠️ Entitas Terdeteksi' : '✅ Area Aman'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Detection Results - Main Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Alert Card */}
                            {entityDetected ? (
                                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 dark:bg-red-900/20 dark:border-red-700">
                                    <div className="text-center mb-6">
                                        <div className="text-6xl mb-4 animate-pulse">🚨</div>
                                        <h2 className="text-3xl font-bold text-red-800 dark:text-red-200 mb-2">
                                            Makhluk Halus Terdeteksi
                                        </h2>
                                        <p className="text-red-600 dark:text-red-400 text-lg">
                                            Aktivitas spiritual tidak biasa ditemukan di lokasi ini
                                        </p>
                                    </div>
                                    
                                    <div className="bg-red-100 dark:bg-red-900/30 rounded-xl p-6 mb-6">
                                        <h3 className="font-bold text-red-800 dark:text-red-200 mb-3">
                                            🛡️ Respons Spiritual Direkomendasikan:
                                        </h3>
                                        <p className="text-red-700 dark:text-red-300 text-lg font-semibold">
                                            "{recommendedResponse}"
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Button
                                            onClick={handlePlayAyatKursi}
                                            disabled={isPlayingAyatKursi}
                                            className="bg-green-600 hover:bg-green-700 text-white py-3"
                                        >
                                            {isPlayingAyatKursi ? '🔊 Memainkan...' : '🎵 Putar Ayat Kursi'}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 py-3"
                                        >
                                            🤲 Lihat Dzikir Penangkal
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 dark:bg-green-900/20 dark:border-green-700">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">✅</div>
                                        <h2 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-2">
                                            Area Spiritual Aman
                                        </h2>
                                        <p className="text-green-600 dark:text-green-400 text-lg">
                                            Tidak ada aktivitas spiritual yang mencurigakan terdeteksi
                                        </p>
                                        <p className="text-green-700 dark:text-green-300 mt-4 text-sm">
                                            Alhamdulillah, lingkungan dalam kondisi spiritual yang baik
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Sensor Readings */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span className="text-2xl">📡</span>
                                        Pembacaan Sensor Spiritual
                                    </h3>
                                    <button 
                                        onClick={() => setShowAllReadings(!showAllReadings)}
                                        className="text-blue-600 hover:text-blue-700 text-sm"
                                    >
                                        {showAllReadings ? 'Sembunyikan Detail' : 'Lihat Detail'}
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className={`rounded-xl p-4 ${emfLevel.color}`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium">EMF Level</span>
                                            <span className="text-xs">{emfLevel.level}</span>
                                        </div>
                                        <div className="text-2xl font-bold">{readings.emf_level} μT</div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                                            <div 
                                                className="bg-current h-2 rounded-full"
                                                style={{ width: `${readings.emf_level}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className={`rounded-xl p-4 ${energyLevel.color}`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium">Energy Disturbance</span>
                                            <span className="text-xs">{energyLevel.level}</span>
                                        </div>
                                        <div className="text-2xl font-bold">{readings.energy_disturbance}%</div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                                            <div 
                                                className="bg-current h-2 rounded-full"
                                                style={{ width: `${readings.energy_disturbance}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {showAllReadings && (
                                        <>
                                            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
                                                <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Spiritual Frequency</div>
                                                <div className="text-xl font-bold text-blue-800 dark:text-blue-200">{readings.spiritual_frequency}</div>
                                            </div>

                                            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4">
                                                <div className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Temperature Anomaly</div>
                                                <div className="text-xl font-bold text-purple-800 dark:text-purple-200">{readings.temperature_anomaly}</div>
                                            </div>

                                            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4 md:col-span-2">
                                                <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">Magnetic Field</div>
                                                <div className="text-xl font-bold text-indigo-800 dark:text-indigo-200">{readings.magnetic_field}</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Protection Panel */}
                        <div className="space-y-6">
                            {/* Protection Prayers */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🛡️</span>
                                    Doa Perlindungan
                                </h3>
                                
                                {protectionPrayers.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex justify-center gap-2 mb-4">
                                            {protectionPrayers.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentPrayerIndex(index)}
                                                    className={`w-3 h-3 rounded-full ${
                                                        index === currentPrayerIndex 
                                                            ? 'bg-emerald-500' 
                                                            : 'bg-gray-300 dark:bg-gray-600'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        
                                        <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4">
                                            <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-3">
                                                {protectionPrayers[currentPrayerIndex]?.name}
                                            </h4>
                                            <div className="text-2xl text-emerald-800 dark:text-emerald-200 mb-3 text-center leading-relaxed">
                                                {protectionPrayers[currentPrayerIndex]?.arabic}
                                            </div>
                                            <div className="text-emerald-700 dark:text-emerald-300 font-medium mb-2 text-center">
                                                {protectionPrayers[currentPrayerIndex]?.latin}
                                            </div>
                                            <div className="text-sm text-emerald-600 dark:text-emerald-400 italic text-center">
                                                "{protectionPrayers[currentPrayerIndex]?.meaning}"
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => setCurrentPrayerIndex((prev) => 
                                                    prev > 0 ? prev - 1 : protectionPrayers.length - 1
                                                )}
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                            >
                                                ←
                                            </Button>
                                            <Button
                                                onClick={() => setCurrentPrayerIndex((prev) => 
                                                    prev < protectionPrayers.length - 1 ? prev + 1 : 0
                                                )}
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                            >
                                                →
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Recommendations */}
                            <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6">
                                <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center gap-2">
                                    <span className="text-xl">⚡</span>
                                    Rekomendasi Tindakan
                                </h4>
                                <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                                    {entityDetected ? (
                                        <>
                                            <p>✓ Perbanyak istighfar dan dzikir</p>
                                            <p>✓ Bacakan Ayat Kursi dan Surah Al-Falaq</p>
                                            <p>✓ Jangan panik, tetap tenang dan bertawakkal</p>
                                            <p>✓ Hindari aktivitas spiritual di area ini</p>
                                            <p>✓ Lakukan ruqyah syar'iyyah jika diperlukan</p>
                                        </>
                                    ) : (
                                        <>
                                            <p>✓ Area aman untuk aktivitas spiritual</p>
                                            <p>✓ Tetap baca do'a sebelum beraktivitas</p>
                                            <p>✓ Jaga kebersihan spiritual</p>
                                            <p>✓ Bersyukur atas perlindungan Allah SWT</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Return Button */}
                            <div className="text-center">
                                <Button
                                    onClick={() => router.visit(route('spiritual.index'))}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
                                >
                                    🏠 Kembali ke Menu Utama
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Disclaimer */}
                <div className="max-w-4xl mx-auto px-4 pb-8">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                            <strong>Disclaimer:</strong> Hasil deteksi ini adalah simulasi untuk panduan spiritual dan tidak menggunakan pengukuran ilmiah sesungguhnya. 
                            Segala sesuatu terjadi atas izin Allah SWT. Wallahu a'lam bis showab.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}