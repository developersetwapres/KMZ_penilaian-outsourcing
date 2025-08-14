<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageUploadRequest;
use App\Http\Requests\ImportUsersRequest;
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
use Illuminate\Foundation\Http\FormRequest;
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
                'criteria' => Kriteria::select(['id', 'nama', 'indikator', 'aspek_id', 'jenis'])
                    ->where('jenis', 'umum')
                    ->with('getAspek')
                    ->get(),
                'criteriaKhusus' => Kriteria::select(['id', 'nama', 'indikator', 'aspek_id', 'jenis'])
                    ->whereNot('jenis', 'umum')
                    ->with('getAspek')
                    ->get()
            ],

            'evaluationResults' => $penugasanPeer->EvaluationResults(),
        ];

        return Inertia::render('penilaian/admin/page', $data);
    }

    public function store(StoreUserRequest $request)
    {
        $finalImagePath = $this->moveImageFromTemp($request->image);
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

    public function importUsers(ImportUsersRequest $request)
    {
        set_time_limit(0); // hilangkan limit waktu eksekusi
        $data = $request->validated();

        $users = [];
        foreach ($data as $value) {
            $plainPassword = !empty($value['password'])
                ? $value['password']
                : Str::random(6);

            $users[] = [
                'name'         => $value['name'],
                'slug'         => Str::slug($value['name'] . '-' . Str::random(5)),
                'email'        => $value['email'],
                'jabatan'      => $value['jabatan'],
                'lokasi_kerja' => $value['lokasi_kerja'],
                'unit_kerja'   => $value['unit_kerja'],
                'perusahaan'   => $value['perusahaan'],
                'role'         => $value['role'],
                'phone'        => $value['phone'] ?? '62123456789',
                'status'       => $value['status'] ?? 'active',
                'image'        => $value['image'] ?? '',
                'password'     => Hash::make($plainPassword),
                'created_at'   => now(),
                'updated_at'   => now(),
            ];
        }

        // Bagi jadi batch 500 user sekali insert
        foreach (array_chunk($users, 100) as $chunk) {
            User::insert($chunk);
        }
    }


    public function importUsersX(ImportUsersRequest $request)
    {
        $data = $request->validated();
        $users = [];

        foreach ($data as $value) {
            // Kalau password tidak ada → generate random 6 karakter (huruf + angka)
            $plainPassword = !empty($value['password'])
                ? $value['password']
                : Str::random(6);

            $users[] = [
                'name'         => $value['name'],
                'slug'         => Str::slug($value['name'] . '-' . Str::random(5)),
                'email'        => $value['email'],
                'jabatan'      => $value['jabatan'],
                'lokasi_kerja' => $value['lokasi_kerja'],
                'unit_kerja'   => $value['unit_kerja'],
                'perusahaan'   => $value['perusahaan'],
                'role'         => $value['role'],
                'phone'        => $value['phone'] ?? '62123456789',
                'status'       => $value['status'] ?? 'active',
                'image'        => $value['image'] ?? '',
                'password'     => Hash::make('plainPassword'),
                'created_at'   => now(),
                'updated_at'   => now(),
            ];
        }

        User::insert($users);
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
