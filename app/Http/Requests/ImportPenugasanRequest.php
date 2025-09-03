<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImportPenugasanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // bisa diatur sesuai kebutuhan auth
    }

    public function rules(): array
    {
        return [
            '*.idPegawai' => ['required', 'integer', 'exists:users,id'],
            // '*.idPenilai' => ['required', 'integer', 'exists:users,id', 'different:*.idPegawai'],
            '*.idPenilai' => ['required', 'integer', 'exists:users,id'],
            '*.type'      => ['required', 'in:atasan,penerima_layanan,teman'],
        ];
    }

    public function messages(): array
    {
        return [
            '*.idPegawai.required' => 'Pegawai wajib diisi.',
            '*.idPegawai.exists'   => 'Pegawai tidak ditemukan.',
            '*.idPenilai.required' => 'Penilai wajib diisi.',
            '*.idPenilai.exists'   => 'Penilai tidak ditemukan.',
            '*.idPenilai.different' => 'Penilai tidak boleh sama dengan pegawai.',
            '*.type.required'      => 'Type penilai wajib diisi.',
            '*.type.in'            => 'Type penilai harus salah satu: atasan, penerima_layanan, atau teman.',
        ];
    }
}
