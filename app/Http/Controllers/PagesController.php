<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageUploadRequest;
use App\Http\Requests\ImportUsersRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Aspek;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Models\Kriteria;
use App\Models\PenugasanPeer;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
        $user = new User();
        $penugasanPeer = new PenugasanPeer();

        $data = [
            'outsourcing' => $user->outsourcings(),
            'users' => User::all(),
            'masterData' => [
                'aspects' => Aspek::select(['id', 'nama', 'deskripsi'])->withCount('countKriteria')->get(),
                'criteria' => Kriteria::select(['id', 'nama', 'aspek_id'])
                    ->with(['getIndikators'])
                    ->with('getAspek')
                    ->get(),
            ],

            'evaluationResults' => $penugasanPeer->EvaluationResults(),
            'rankingskor' => $penugasanPeer->RankingSkor(),
        ];

        return Inertia::render('penilaian/admin/page', $data);
    }

    public function store(StoreUserRequest $request)
    {
        $finalImagePath = $this->moveImageFromTemp($request->image, $request->role);
        User::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name . '-' . Str::random(5)),
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

    public function resetUser()
    {
        User::query()->delete();
        DB::statement('ALTER TABLE users AUTO_INCREMENT = 1');
        // DB::statement("DELETE FROM sqlite_sequence WHERE name='users'");

        $name = 'Administrator';
        $names = explode(' ', $name);
        $firstTwoNames = strtolower($names[0] . ($names[1] ?? ''));

        User::create([
            'name' => $name,
            'slug' => Str::slug($name . '-' . Str::random(5)),
            'email' => "{$firstTwoNames}@set.wapresri.go.id",
            'jabatan' => 'Admin',
            'lokasi_kerja' => 'Merdeka Selatan',
            'unit_kerja' => 'Kepegawaian',
            'perusahaan' => 'PT. Miftah Bahtera Mandiri',
            'phone' => '08123456789',
            'role' => 'admin',
            'status' => 'active',
            'image' => 'image/user.png',
            'email_verified_at' => now(),
            'password' => Hash::make('adm1n02'),
            'remember_token' => Str::random(10),
        ]);
    }


    public function update(UpdateUserRequest $request, User $user)
    {
        $finalImagePath = $this->moveImageFromTemp($request->image,  $request->role);

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

    private function moveImageFromTemp(?string $imageUrl, ?string $role): ?string
    {
        $path = $role === 'outsourcing' ? 'os' : 'asn';

        $imageUrlNew = Str::replace('temp/', '', $imageUrl);
        $imageUrlNew = Str::replace('image/' . $path . '/', '', $imageUrlNew);

        $temp = Storage::disk('temp');
        $sourcePath = $temp->path($imageUrlNew);

        // tentukan folder tujuan di public/image/user
        $destinationDir = public_path('/storage/image/' . $path);

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

        return 'image/' . $path . "/" . $imageUrlNew;
    }
}
