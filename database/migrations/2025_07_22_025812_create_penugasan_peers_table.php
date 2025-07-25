<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('penugasan_peers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('outsourcing_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('penilai_id')->constrained('users')->cascadeOnDelete();
            $table->enum('type_penilai', ['teman', 'penerima_layanan', 'atasan']);
            $table->string('status');
            $table->text('catatan');
            $table->timestamps();

            // untuk mencegah duplikat data yang sama
            $table->unique(['outsourcing_id', 'penilai_id', 'type_penilai']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penugasan_peers');
    }
};
