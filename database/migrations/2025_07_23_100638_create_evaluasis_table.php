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
        Schema::create('evaluasis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('penugasan_peer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('kriteria_id')->constrained()->cascadeOnDelete();
            $table->integer('skor');
            $table->timestamps();

            $table->unique(['penugasan_peer_id', 'kriteria_id']); // tidak boleh double
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluasis');
    }
};
