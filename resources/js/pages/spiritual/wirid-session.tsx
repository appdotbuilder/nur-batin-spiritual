import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    session: {
        id: number;
        wirid_name: string;
        status: string;
        feedback_data: {
            start_time: string;
            alignment_score: number;
            spiritual_frequency: string;
            aura_reading: string;
        };
        created_at: string;
    };
    wiridTexts: {
        arabic: string;
        latin: string;
        meaning: string;
        repetitions: number;
        benefits: string;
    };
    [key: string]: unknown;
}

export default function WiridSession({ session, wiridTexts }: Props) {
    const [currentCount, setCurrentCount] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [sessionTime, setSessionTime] = useState(0);
    const [alignmentScore, setAlignmentScore] = useState(session.feedback_data.alignment_score);
    const [currentFrequency, setCurrentFrequency] = useState(session.feedback_data.spiritual_frequency);

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setSessionTime(time => time + 1);
                
                // Simulate alignment changes
                if (Math.random() > 0.7) {
                    setAlignmentScore(prev => Math.max(60, Math.min(100, prev + Math.random() * 10 - 5)));
                }
                
                // Simulate frequency changes
                if (Math.random() > 0.8) {
                    const newFreq = Math.floor(Math.random() * 20) + 45;
                    setCurrentFrequency(`${newFreq} Hz`);
                }
            }, 1000);
        } else {
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive]);

    const handleCountIncrement = () => {
        setCurrentCount(prev => prev + 1);
        
        // Simulate positive feedback on count
        if (Math.random() > 0.6) {
            setAlignmentScore(prev => Math.min(100, prev + Math.random() * 3));
        }
    };

    const handleCompleteSession = () => {
        setIsActive(false);
        const minutes = Math.floor(sessionTime / 60);
        
        router.post(route('spiritual.wirid.complete', session.id), {
            duration: minutes > 0 ? minutes : 1,
        });
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getAlignmentColor = (score: number) => {
        if (score >= 90) return 'text-emerald-500';
        if (score >= 80) return 'text-green-500';
        if (score >= 70) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getAuraEmoji = (reading: string) => {
        switch (reading) {
            case 'positive': return '✨';
            case 'balanced': return '🌟';
            case 'harmonious': return '💫';
            default: return '⭐';
        }
    };

    return (
        <>
            <Head title={`Sesi Wirid - ${session.wirid_name}`} />
            
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900 dark:to-blue-900">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-emerald-200 dark:border-emerald-700">
                    <div className="max-w-4xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => router.visit(route('spiritual.index'))}
                                    className="text-emerald-600 hover:text-emerald-700"
                                >
                                    ← Kembali
                                </button>
                                <div>
                                    <h1 className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
                                        Sesi Wirid: {session.wirid_name}
                                    </h1>
                                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                                        Status: {isActive ? 'Aktif' : 'Selesai'} • Waktu: {formatTime(sessionTime)}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-lg font-bold ${getAlignmentColor(alignmentScore)}`}>
                                    Alignment: {Math.round(alignmentScore)}%
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Frekuensi: {currentFrequency}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Wirid Text - Main Column */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-6">
                                <div className="text-center mb-8">
                                    <div className="text-4xl mb-4">📿</div>
                                    <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
                                        {session.wirid_name}
                                    </h2>
                                    <p className="text-emerald-600 dark:text-emerald-400">
                                        {wiridTexts.benefits}
                                    </p>
                                </div>

                                {/* Arabic Text */}
                                <div className="text-center mb-8">
                                    <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-8 mb-4">
                                        <div className="text-4xl md:text-6xl text-emerald-800 dark:text-emerald-200 font-arabic leading-relaxed">
                                            {wiridTexts.arabic}
                                        </div>
                                    </div>
                                    
                                    {/* Latin Text */}
                                    <div className="text-xl md:text-2xl text-emerald-700 dark:text-emerald-300 font-semibold mb-4">
                                        {wiridTexts.latin}
                                    </div>
                                    
                                    {/* Meaning */}
                                    <div className="text-lg text-gray-600 dark:text-gray-400 italic">
                                        "{wiridTexts.meaning}"
                                    </div>
                                </div>

                                {/* Counter */}
                                <div className="text-center mb-8">
                                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6">
                                        <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                            {currentCount}
                                        </div>
                                        <div className="text-lg text-blue-800 dark:text-blue-200 mb-4">
                                            dari {wiridTexts.repetitions} kali
                                        </div>
                                        <div className="w-full bg-blue-200 dark:bg-blue-700 rounded-full h-3">
                                            <div 
                                                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                                                style={{ width: `${Math.min(100, (currentCount / wiridTexts.repetitions) * 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="text-center">
                                    {isActive && currentCount < wiridTexts.repetitions ? (
                                        <Button
                                            onClick={handleCountIncrement}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 text-xl rounded-xl"
                                        >
                                            🤲 Hitung Bacaan (+1)
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleCompleteSession}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-xl rounded-xl"
                                        >
                                            ✅ Selesaikan Sesi
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Feedback Panel */}
                        <div className="space-y-6">
                            {/* Spiritual Feedback */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🌟</span>
                                    Feedback Spiritual
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4">
                                        <div className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">Alignment</div>
                                        <div className={`text-2xl font-bold ${getAlignmentColor(alignmentScore)}`}>
                                            {Math.round(alignmentScore)}%
                                        </div>
                                        <div className="w-full bg-emerald-200 dark:bg-emerald-700 rounded-full h-2 mt-2">
                                            <div 
                                                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${alignmentScore}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                                        <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Aura Reading</div>
                                        <div className="text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                                            <span>{getAuraEmoji(session.feedback_data.aura_reading)}</span>
                                            {session.feedback_data.aura_reading}
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                                        <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">Frekuensi</div>
                                        <div className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                                            {currentFrequency}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Session Stats */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📊</span>
                                    Statistik Sesi
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Durasi</span>
                                        <span className="font-semibold">{formatTime(sessionTime)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                        <span className="font-semibold">
                                            {Math.round((currentCount / wiridTexts.repetitions) * 100)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Mulai</span>
                                        <span className="font-semibold">{session.feedback_data.start_time}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Target</span>
                                        <span className="font-semibold">{wiridTexts.repetitions}x</span>
                                    </div>
                                </div>
                            </div>

                            {/* Spiritual Guidance */}
                            <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6">
                                <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
                                    <span className="text-xl">💡</span>
                                    Panduan
                                </h4>
                                <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                                    <p>• Bacalah dengan khusyuk dan penuh konsentrasi</p>
                                    <p>• Pastikan hati dalam keadaan tenang</p>
                                    <p>• Niatkan untuk mendekatkan diri kepada Allah</p>
                                    <p>• Jangan terburu-buru, bacalah dengan perlahan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}