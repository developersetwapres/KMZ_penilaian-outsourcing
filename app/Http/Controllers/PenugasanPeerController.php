<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePenugasanPeerRequest;
use App\Models\PenugasanPeer;
use Illuminate\Http\Request;

class PenugasanPeerController extends Controller
{
    public function store(StorePenugasanPeerRequest $request)
    {
        dd($request->all());

        PenugasanPeer::create($request->validated());
    }
}
