<?php

namespace App\Http\Controllers;

use App\Models\Indikator;
use Illuminate\Support\Facades\DB;

class IndikatorController extends Controller
{
    public function reset()
    {
        Indikator::query()->delete();
        DB::statement('ALTER TABLE users AUTO_INCREMENT = 1');
    }
}
