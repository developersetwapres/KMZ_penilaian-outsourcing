<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PagesController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('penilaian/page');
    }

    public function dashboard(): Response
    {
        $data = [
            'outsourcing' => User::where('role', 'outsourcing')->get()
        ];

        return Inertia::render('penilaian/admin/page', $data);
    }
}
