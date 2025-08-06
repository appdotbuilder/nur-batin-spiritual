<?php

use App\Models\DetectionLog;
use App\Models\WiridSession;

it('loads spiritual index page', function () {
    // Create some test data
    WiridSession::factory(3)->completed()->create();
    DetectionLog::factory(2)->create();

    $response = $this->get(route('spiritual.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('spiritual/index')
        ->has('stats')
        ->has('recentSessions')
        ->has('recentDetections')
    );
});

it('can start wirid session', function () {
    $response = $this->post(route('spiritual.wirid.start'), [
        'wirid_name' => 'Yaa Nur',
    ]);

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('spiritual/wirid-session')
        ->has('session')
        ->has('wiridTexts')
    );

    $this->assertDatabaseHas('wirid_sessions', [
        'wirid_name' => 'Yaa Nur',
        'status' => 'active',
    ]);
});

it('validates wirid name is required', function () {
    $response = $this->post(route('spiritual.wirid.start'), []);

    $response->assertStatus(302);
    $response->assertSessionHasErrors(['wirid_name']);
});

it('can complete wirid session', function () {
    $session = WiridSession::factory()->active()->create();

    $response = $this->post(route('spiritual.wirid.complete', $session), [
        'duration' => 15,
    ]);

    $response->assertRedirect(route('spiritual.index'));
    $response->assertSessionHas('success');

    $session->refresh();
    expect($session->status)->toBe('completed');
    expect($session->duration_minutes)->toBe(15);
});

it('can perform spiritual detection', function () {
    $response = $this->post(route('spiritual.detect'), [
        'location' => 'Test Location',
    ]);

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('spiritual/detection-result')
        ->has('log')
        ->has('readings')
        ->has('protectionPrayers')
    );

    $this->assertDatabaseHas('detection_logs', [
        'location' => 'Test Location',
        'detection_type' => 'spiritual_entity',
    ]);
});

it('loads spiritual history page', function () {
    WiridSession::factory(5)->create();
    DetectionLog::factory(3)->create();

    $response = $this->get(route('spiritual.history'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('spiritual/history')
        ->has('sessions')
        ->has('detections')
    );
});

it('shows spiritual app on welcome page', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('welcome')
    );
});

it('creates wirid session with proper feedback data', function () {
    $response = $this->post(route('spiritual.wirid.start'), [
        'wirid_name' => 'Yaa Haqq',
    ]);

    $response->assertStatus(200);

    $session = WiridSession::where('wirid_name', 'Yaa Haqq')->first();
    expect($session)->not->toBeNull();
    expect($session->feedback_data)->not->toBeNull();
    expect($session->feedback_data)->toHaveKey('alignment_score');
    expect($session->feedback_data)->toHaveKey('spiritual_frequency');
    expect($session->feedback_data)->toHaveKey('aura_reading');
});

it('creates detection with proper readings', function () {
    $response = $this->post(route('spiritual.detect'), [
        'location' => 'Mushola',
    ]);

    $response->assertStatus(200);

    $detection = DetectionLog::where('location', 'Mushola')->first();
    expect($detection)->not->toBeNull();
    expect($detection->simulated_readings)->not->toBeNull();
    expect($detection->simulated_readings)->toHaveKey('emf_level');
    expect($detection->simulated_readings)->toHaveKey('spiritual_frequency');
    expect($detection->simulated_readings)->toHaveKey('energy_disturbance');
});