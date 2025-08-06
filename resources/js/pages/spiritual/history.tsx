import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface WiridSession {
    id: number;
    wirid_name: string;
    duration_minutes: number;
    status: string;
    feedback_data: {
        start_time?: string;
        alignment_score?: number;
        spiritual_frequency?: string;
        aura_reading?: string;
        final_alignment?: number;
        completion_score?: number;
    } | null;
    created_at: string;
}

interface DetectionLog {
    id: number;
    detection_type: string;
    entity_detected: boolean;
    location: string;
    simulated_readings: {
        emf_level?: number;
        spiritual_frequency?: string;
        energy_disturbance?: number;
        temperature_anomaly?: string;
        magnetic_field?: string;
    } | null;
    recommended_response: string | null;
    created_at: string;
}

interface Props {
    sessions: {
        data: WiridSession[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    detections: {
        data: DetectionLog[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function SpiritualHistory({ sessions, detections }: Props) {
    const [activeTab, setActiveTab] = useState<'wirid' | 'detection'>('wirid');

    const formatDuration = (minutes: number) => {
        if (minutes < 60) {
            return `${minutes} menit`;
        }
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}j ${remainingMinutes}m`;
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs dark:bg-green-900/30 dark:text-green-400">✅ Selesai</span>;
            case 'active':
                return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs dark:bg-blue-900/30 dark:text-blue-400">🔄 Aktif</span>;
            case 'interrupted':
                return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs dark:bg-yellow-900/30 dark:text-yellow-400">⏸️ Terhenti</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs dark:bg-gray-900/30 dark:text-gray-400">{status}</span>;
        }
    };

    const getDetectionBadge = (detected: boolean) => {
        return detected 
            ? <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs dark:bg-red-900/30 dark:text-red-400">⚠️ Terdeteksi</span>
            : <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs dark:bg-green-900/30 dark:text-green-400">✅ Aman</span>;
    };

    return (
        <>
            <Head title="Riwayat Spiritual - Nur Batin" />
            
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900 dark:to-blue-900">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-emerald-200 dark:border-emerald-700">
                    <div className="max-w-6xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => router.visit(route('spiritual.index'))}
                                    className="text-emerald-600 hover:text-emerald-700"
                                >
                                    ← Kembali
                                </button>
                                <div>
                                    <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                                        Log Spiritual
                                    </h1>
                                    <p className="text-emerald-600 dark:text-emerald-400">
                                        Riwayat wirid dan deteksi spiritual Anda
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Total: {sessions.total} sesi wirid • {detections.total} deteksi
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Summary Stats */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">📿</span>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Total Wirid</h3>
                                    <p className="text-2xl font-bold text-emerald-600">{sessions.total}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">🕐</span>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Durasi Total</h3>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {formatDuration(sessions.data.reduce((total, session) => total + session.duration_minutes, 0))}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">🔮</span>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Deteksi</h3>
                                    <p className="text-2xl font-bold text-red-600">{detections.total}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">⚠️</span>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Entitas</h3>
                                    <p className="text-2xl font-bold text-orange-600">
                                        {detections.data.filter(d => d.entity_detected).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6">
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setActiveTab('wirid')}
                                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                                    activeTab === 'wirid'
                                        ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                <span className="text-xl mr-2">📿</span>
                                Riwayat Wirid ({sessions.total})
                            </button>
                            <button
                                onClick={() => setActiveTab('detection')}
                                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                                    activeTab === 'detection'
                                        ? 'bg-red-50 text-red-600 border-b-2 border-red-600 dark:bg-red-900/30 dark:text-red-400'
                                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                <span className="text-xl mr-2">🔮</span>
                                Riwayat Deteksi ({detections.total})
                            </button>
                        </div>

                        {/* Wirid History Tab */}
                        {activeTab === 'wirid' && (
                            <div className="p-6">
                                {sessions.data.length > 0 ? (
                                    <div className="space-y-4">
                                        {sessions.data.map((session) => (
                                            <div
                                                key={session.id}
                                                className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6 border border-emerald-200 dark:border-emerald-700"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                                                            <span className="text-2xl">📿</span>
                                                            {session.wirid_name}
                                                        </h3>
                                                        <p className="text-emerald-600 dark:text-emerald-400">
                                                            {new Date(session.created_at).toLocaleDateString('id-ID', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        {getStatusBadge(session.status)}
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-3 gap-4">
                                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                                                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Durasi</div>
                                                        <div className="text-lg font-semibold text-blue-600">{formatDuration(session.duration_minutes)}</div>
                                                    </div>
                                                    {session.feedback_data && (
                                                        <>
                                                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                                                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Alignment</div>
                                                                <div className="text-lg font-semibold text-emerald-600">
                                                                    {session.feedback_data.final_alignment || session.feedback_data.alignment_score || 'N/A'}%
                                                                </div>
                                                            </div>
                                                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                                                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Aura</div>
                                                                <div className="text-lg font-semibold text-purple-600 capitalize">
                                                                    {session.feedback_data.aura_reading || 'Balanced'}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Pagination for wirid sessions would go here */}
                                        {sessions.last_page > 1 && (
                                            <div className="flex justify-center mt-6">
                                                <p className="text-sm text-gray-500">
                                                    Halaman {sessions.current_page} dari {sessions.last_page}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-4xl mb-4">📿</div>
                                        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                            Belum ada riwayat wirid
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-500 mb-6">
                                            Mulai sesi wirid pertama Anda untuk melihat riwayat di sini
                                        </p>
                                        <Button
                                            onClick={() => router.visit(route('spiritual.index'))}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                        >
                                            🚀 Mulai Wirid Sekarang
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Detection History Tab */}
                        {activeTab === 'detection' && (
                            <div className="p-6">
                                {detections.data.length > 0 ? (
                                    <div className="space-y-4">
                                        {detections.data.map((detection) => (
                                            <div
                                                key={detection.id}
                                                className={`rounded-lg p-6 border ${
                                                    detection.entity_detected
                                                        ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
                                                        : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className={`text-xl font-bold flex items-center gap-2 ${
                                                            detection.entity_detected
                                                                ? 'text-red-800 dark:text-red-200'
                                                                : 'text-green-800 dark:text-green-200'
                                                        }`}>
                                                            <span className="text-2xl">{detection.entity_detected ? '🚨' : '✅'}</span>
                                                            Deteksi Spiritual
                                                        </h3>
                                                        <p className={`${
                                                            detection.entity_detected
                                                                ? 'text-red-600 dark:text-red-400'
                                                                : 'text-green-600 dark:text-green-400'
                                                        }`}>
                                                            {detection.location} • {new Date(detection.created_at).toLocaleDateString('id-ID', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        {getDetectionBadge(detection.entity_detected)}
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    {detection.simulated_readings && (
                                                        <>
                                                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                                                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">EMF Level</div>
                                                                <div className="text-lg font-semibold text-blue-600">
                                                                    {detection.simulated_readings.emf_level} μT
                                                                </div>
                                                            </div>
                                                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                                                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Energy Disturbance</div>
                                                                <div className="text-lg font-semibold text-orange-600">
                                                                    {detection.simulated_readings.energy_disturbance}%
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                {detection.recommended_response && (
                                                    <div className={`rounded-lg p-4 ${
                                                        detection.entity_detected
                                                            ? 'bg-red-100 dark:bg-red-900/30'
                                                            : 'bg-green-100 dark:bg-green-900/30'
                                                    }`}>
                                                        <div className={`text-sm font-medium mb-2 ${
                                                            detection.entity_detected
                                                                ? 'text-red-800 dark:text-red-200'
                                                                : 'text-green-800 dark:text-green-200'
                                                        }`}>
                                                            🛡️ Respons Spiritual:
                                                        </div>
                                                        <div className={`text-sm ${
                                                            detection.entity_detected
                                                                ? 'text-red-700 dark:text-red-300'
                                                                : 'text-green-700 dark:text-green-300'
                                                        }`}>
                                                            "{detection.recommended_response}"
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {/* Pagination for detections would go here */}
                                        {detections.last_page > 1 && (
                                            <div className="flex justify-center mt-6">
                                                <p className="text-sm text-gray-500">
                                                    Halaman {detections.current_page} dari {detections.last_page}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-4xl mb-4">🔮</div>
                                        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                            Belum ada riwayat deteksi
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-500 mb-6">
                                            Lakukan deteksi spiritual pertama untuk melihat riwayat di sini
                                        </p>
                                        <Button
                                            onClick={() => router.visit(route('spiritual.index'))}
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            🔍 Mulai Deteksi
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}