<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StartWiridRequest;
use App\Http\Requests\StoreDetectionRequest;
use App\Http\Requests\UpdateWiridSessionRequest;
use App\Models\DetectionLog;
use App\Models\WiridSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpiritualController extends Controller
{
    /**
     * Display the main spiritual application.
     */
    public function index()
    {
        $recentSessions = WiridSession::latest()->take(3)->get();
        $recentDetections = DetectionLog::latest()->take(3)->get();
        $totalSessions = WiridSession::completed()->count();
        $detectionCount = DetectionLog::withEntityDetected()->count();
        
        return Inertia::render('spiritual/index', [
            'stats' => [
                'totalSessions' => $totalSessions,
                'detectionCount' => $detectionCount,
                'lastSessionDate' => $recentSessions->first()?->created_at?->format('d M Y'),
            ],
            'recentSessions' => $recentSessions,
            'recentDetections' => $recentDetections,
        ]);
    }

    /**
     * Store a newly created wirid session.
     */
    public function store(StartWiridRequest $request)
    {
        $validated = $request->validated();

        $session = WiridSession::create([
            'wirid_name' => $validated['wirid_name'],
            'status' => 'active',
            'feedback_data' => [
                'start_time' => now()->toTimeString(),
                'alignment_score' => random_int(70, 95),
                'spiritual_frequency' => random_int(40, 60) . ' Hz',
                'aura_reading' => ['positive', 'balanced', 'harmonious'][random_int(0, 2)],
            ],
        ]);

        return Inertia::render('spiritual/wirid-session', [
            'session' => $session,
            'wiridTexts' => $this->getWiridTexts($validated['wirid_name']),
        ]);
    }

    /**
     * Update the specified wirid session.
     */
    public function update(UpdateWiridSessionRequest $request, WiridSession $session)
    {
        $validated = $request->validated();
        $duration = $validated['duration'] ?? random_int(5, 30);
        
        $feedbackData = array_merge($session->feedback_data ?? [], [
            'end_time' => now()->toTimeString(),
            'duration_minutes' => $duration,
            'completion_score' => random_int(85, 100),
            'spiritual_energy' => 'Enhanced',
            'final_alignment' => random_int(88, 98),
        ]);

        $session->update([
            'status' => 'completed',
            'duration_minutes' => $duration,
            'feedback_data' => $feedbackData,
        ]);

        return redirect()->route('spiritual.index')
            ->with('success', 'Wirid session completed successfully. Barakallahu fiik.');
    }

    /**
     * Create a new detection log.
     */
    public function create(StoreDetectionRequest $request)
    {
        $validated = $request->validated();
        $entityDetected = random_int(1, 100) <= 30; // 30% chance of detection
        
        $readings = [
            'emf_level' => random_int(10, 85),
            'spiritual_frequency' => random_int(20, 80) . ' Hz',
            'energy_disturbance' => random_int(15, 75),
            'temperature_anomaly' => random_int(-5, 10) . '°C',
            'magnetic_field' => random_int(20, 60) . ' μT',
        ];

        $recommendedResponse = null;
        if ($entityDetected) {
            $responses = [
                "A'udzu billahi minasy-syaitaanir rajiim (3x)",
                "Bacaan Ayat Kursi",
                "Dzikir: La hawla wa la quwwata illa billahi",
                "Surat Al-Falaq dan An-Nas",
            ];
            $recommendedResponse = $responses[random_int(0, count($responses) - 1)];
        }

        $log = DetectionLog::create([
            'detection_type' => $validated['detection_type'] ?? 'spiritual_entity',
            'location' => $validated['location'] ?? 'Unknown Location',
            'simulated_readings' => $readings,
            'entity_detected' => $entityDetected,
            'recommended_response' => $recommendedResponse,
        ]);

        return Inertia::render('spiritual/detection-result', [
            'log' => $log,
            'readings' => $readings,
            'entityDetected' => $entityDetected,
            'recommendedResponse' => $recommendedResponse,
            'protectionPrayers' => $this->getProtectionPrayers(),
        ]);
    }

    /**
     * Display the spiritual history.
     */
    public function show()
    {
        $sessions = WiridSession::latest()->paginate(20);
        $detections = DetectionLog::latest()->paginate(20);

        return Inertia::render('spiritual/history', [
            'sessions' => $sessions,
            'detections' => $detections,
        ]);
    }

    /**
     * Get wirid texts based on type.
     *
     * @param string $wiridName
     * @return array
     */
    protected function getWiridTexts($wiridName)
    {
        $texts = [
            'Yaa Nur' => [
                'arabic' => 'يَا نُورُ، يَا نُورُ، يَا نُورُ',
                'latin' => 'Yaa Nuuru, Yaa Nuuru, Yaa Nuuru',
                'meaning' => 'Ya Allah Yang Maha Bercahaya, Ya Allah Yang Maha Bercahaya',
                'repetitions' => 99,
                'benefits' => 'Untuk mencerahkan hati dan mendapat hidayah spiritual',
            ],
            'Yaa Haqq' => [
                'arabic' => 'يَا حَقُّ، يَا حَقُّ، يَا حَقُّ',
                'latin' => 'Yaa Haqqu, Yaa Haqqu, Yaa Haqqu',
                'meaning' => 'Ya Allah Yang Maha Benar, Ya Allah Yang Maha Benar',
                'repetitions' => 66,
                'benefits' => 'Untuk mendapatkan kebenaran dan keteguhan iman',
            ],
            'La Hawla' => [
                'arabic' => 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
                'latin' => 'Laa hawla wa laa quwwata illaa billaahi',
                'meaning' => 'Tiada daya dan kekuatan kecuali dengan pertolongan Allah',
                'repetitions' => 100,
                'benefits' => 'Untuk kekuatan spiritual dan perlindungan',
            ],
            'Asmaul Husna' => [
                'arabic' => 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ لَهُ الْأَسْمَاءُ الْحُسْنَىٰ',
                'latin' => 'Allaahu laa ilaaha illaa huwa lahul asmaa ul husnaa',
                'meaning' => 'Allah, tidak ada Tuhan selain Dia, milik-Nya nama-nama yang indah',
                'repetitions' => 33,
                'benefits' => 'Untuk mendekatkan diri kepada Allah SWT',
            ],
        ];

        return $texts[$wiridName] ?? $texts['Yaa Nur'];
    }

    /**
     * Get protection prayers and responses.
     *
     * @return array
     */
    protected function getProtectionPrayers()
    {
        return [
            [
                'name' => 'Ta\'awwudz',
                'arabic' => 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
                'latin' => 'A\'uudzu billaahi minasy syaitaanir rajiim',
                'meaning' => 'Aku berlindung kepada Allah dari godaan syaitan yang terkutuk',
            ],
            [
                'name' => 'Ayat Kursi',
                'arabic' => 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
                'latin' => 'Allaahu laa ilaaha illaa huwal hayyul qayyuum...',
                'meaning' => 'Allah, tidak ada Tuhan selain Dia, Yang Maha Hidup dan Maha Mengurus...',
            ],
            [
                'name' => 'Surat Al-Falaq',
                'arabic' => 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
                'latin' => 'Qul a\'uudzu bi rabbil falaq',
                'meaning' => 'Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh',
            ],
            [
                'name' => 'Surat An-Nas',
                'arabic' => 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
                'latin' => 'Qul a\'uudzu bi rabbin naas',
                'meaning' => 'Katakanlah: Aku berlindung kepada Tuhan manusia',
            ],
        ];
    }
}