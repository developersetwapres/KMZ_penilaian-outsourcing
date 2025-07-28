<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageUploadRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Aspek;
use App\Models\Evaluasi;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Models\Kriteria;
use App\Models\PenugasanPeer;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class PagesController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('penilaian/page');
    }

    public function dashboard(): Response
    {
        $user = new User();

        // Ambil semua penugasan peer dan group berdasarkan outsourcing yang dinilai
        $assignments = PenugasanPeer::with(['outsourcing', 'penilai'])
            ->get()
            ->groupBy('outsourcing_id');

        $results = [];

        foreach ($assignments as $outsourcingId => $group) {
            $outsourcingUser = $group->first()->outsourcing;

            // Build evaluatorScores
            $evaluatorScores = [];
            $weightedSum = 0;

            foreach ($group as $assignment) {
                $type       = $assignment->type_penilai;
                $weightStr  = $assignment->weight;              // e.g. '50%'
                $weight     = floatval(str_replace('%', '', $weightStr)) / 100;

                // Ambil evaluasi berdasarkan penugasan_peer_id
                $averageScore = Evaluasi::where('penugasan_peer_id', $assignment->id)->avg('skor');

                $weightedSum += $averageScore * $weight;

                $evaluatorScores[] = [
                    'type'         => $type,
                    'evaluatorName' => $assignment->penilai->name,
                    'overallScore' => round($averageScore, 1),
                    'weight'       => $weightStr,
                ];
            }

            // Tentukan status
            $status = $group->every(function ($assignment) {
                return Evaluasi::where('penugasan_peer_id', $assignment->id)->exists();
            }) ? 'completed' : 'in-progress';


            $results[] = [
                'id'                   => $outsourcingUser->id,
                'name'                 => $outsourcingUser->name,
                'unit_kerja'           => $outsourcingUser->unit_kerja,
                'jabatan'              => $outsourcingUser->jabatan,
                'image'                => $outsourcingUser->image,
                'evaluatorScores'      => $evaluatorScores,
                'weightedOverallScore' => round($weightedSum, 1),
                'status'               => $status,
            ];
        }

        $data = [
            'outsourcing' => $user->outsourcings(),
            'users' => User::all(),
            'masterData' => [
                'aspects' => Aspek::select(['id', 'nama', 'deskripsi'])->withCount('countKriteria')->get(),
                'criteria' => Kriteria::select(['id', 'nama', 'indikator', 'aspek_id', 'jenis'])
                    ->where('jenis', 'umum')
                    ->with('getAspek')
                    ->get(),
                'criteriaKhusus' => Kriteria::select(['id', 'nama', 'indikator', 'aspek_id', 'jenis'])
                    ->whereNot('jenis', 'umum')
                    ->with('getAspek')
                    ->get()
            ],

            'evaluationResults' => $results,
        ];

        return Inertia::render('penilaian/admin/page', $data);
    }

    public function store(StoreUserRequest $request)
    {
        $finalImagePath = $this->moveImageFromTemp($request->image);
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'jabatan' => $request->jabatan,
            'lokasi_kerja' => $request->lokasi_kerja,
            'unit_kerja' => $request->unit_kerja,
            'perusahaan' => $request->perusahaan,
            'role' => $request->role,
            'phone' => $request->phone,
            'status' => $request->status,
            'image' => $finalImagePath,
            'password' => Hash::make($request->password),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $finalImagePath = $this->moveImageFromTemp($request->image);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'jabatan' => $request->jabatan,
            'lokasi_kerja' => $request->lokasi_kerja,
            'unit_kerja' => $request->unit_kerja,
            'perusahaan' => $request->perusahaan,
            'role' => $request->role,
            'phone' => $request->phone,
            'status' => $request->status,
            'image' => $finalImagePath,
            'password' => Hash::make($request->password),
        ]);
    }

    public function uploadTempImage(ImageUploadRequest $request)
    {
        $path = $request->file('image')->store('', 'temp');
        session()->flash('pathTemp', 'temp/' . $path);
    }

    private function moveImageFromTemp(?string $imageUrl): ?string
    {
        $imageUrlNew = Str::replace('temp/', '', $imageUrl,);

        $temp = Storage::disk('temp');
        $sourcePath = $temp->path($imageUrlNew);

        // tentukan folder tujuan di public/image/user
        $destinationDir = public_path('/storage/image/user');

        // pastikan folder tujuan ada
        if (! File::exists($destinationDir)) {
            File::makeDirectory($destinationDir, 0755, true);
        }

        // pindahkan file dari temp ke tujuan
        if (File::exists($sourcePath)) {
            File::move($sourcePath, $destinationDir . DIRECTORY_SEPARATOR . $imageUrlNew);
        }

        // hapus semua isi folder temp
        $allTempFiles = $temp->allFiles();
        if (!empty($allTempFiles)) {
            $temp->delete($allTempFiles);
        }

        return 'image/user/' . $imageUrlNew;
    }
}
