<?php

use App\Http\Controllers\SpiritualController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Spiritual Application Routes
Route::prefix('spiritual')->name('spiritual.')->group(function () {
    Route::get('/', [SpiritualController::class, 'index'])->name('index');
    Route::post('/wirid', [SpiritualController::class, 'store'])->name('wirid.start');
    Route::post('/wirid/{session}', [SpiritualController::class, 'update'])->name('wirid.complete');
    Route::post('/detect', [SpiritualController::class, 'create'])->name('detect');
    Route::get('/history', [SpiritualController::class, 'show'])->name('history');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
