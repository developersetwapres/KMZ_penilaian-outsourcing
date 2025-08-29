<?php

namespace App\Http\Controllers;

use App\Models\Indikator;

class IndikatorController extends Controller
{
    public function reset()
    {
        Indikator::truncate();
    }
}
