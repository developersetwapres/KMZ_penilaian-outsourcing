<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ImportUsersRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            '*.id' => ['required', 'integer', Rule::exists('penugasan_peers', 'penilai_id')],
            '*.name'         => ['required', 'string', 'max:255'],
            '*.email'        => ['required', 'email', Rule::unique('users', 'email')],
            '*.jabatan'      => ['required', 'string', 'max:255'],
            '*.lokasi_kerja' => ['required', 'string', 'max:255'],
            '*.unit_kerja'   => ['required', 'string', 'max:255'],
            '*.perusahaan'   => ['required', 'string', 'max:255'],
            '*.role'         => ['required', 'string', 'max:50'],
            '*.nip'          => ['nullable', 'string', 'max:50'],
            '*.phone'        => ['nullable', 'string', 'max:255'],
            '*.status'       => ['nullable', 'in:active,inactive'],
            '*.image'        => ['nullable', 'string', 'max:255'],
            '*.password'     => ['nullable', 'string', 'min:6'],
        ];
    }

    public function messages(): array
    {
        return [
            '*.id.required' => 'ID wajib diisi.',
            '*.id.integer'  => 'ID harus berupa angka.',
            '*.id.exists'   => 'ID ":input" tidak ditemukan di tabel penugasan_peers.',

            '*.name.required'         => 'Nama wajib diisi.',
            '*.name.string'           => 'Nama harus berupa teks.',
            '*.name.max'              => 'Nama maksimal 255 karakter.',

            '*.email.required'        => 'Email wajib diisi.',
            '*.email.email'           => 'Format email tidak valid.',
            '*.email.unique'          => 'Email ":input" sudah terdaftar.',

            '*.jabatan.required'      => 'Jabatan wajib diisi.',
            '*.jabatan.string'        => 'Jabatan harus berupa teks.',
            '*.jabatan.max'           => 'Jabatan maksimal 255 karakter.',

            '*.lokasi_kerja.required' => 'Lokasi kerja wajib diisi.',
            '*.lokasi_kerja.string'   => 'Lokasi kerja harus berupa teks.',
            '*.lokasi_kerja.max'      => 'Lokasi kerja maksimal 255 karakter.',

            '*.unit_kerja.required'   => 'Unit kerja wajib diisi.',
            '*.unit_kerja.string'     => 'Unit kerja harus berupa teks.',
            '*.unit_kerja.max'        => 'Unit kerja maksimal 255 karakter.',

            '*.perusahaan.required'   => 'Perusahaan wajib diisi.',
            '*.perusahaan.string'     => 'Perusahaan harus berupa teks.',
            '*.perusahaan.max'        => 'Perusahaan maksimal 255 karakter.',

            '*.role.required'         => 'Role wajib diisi.',
            '*.role.string'           => 'Role harus berupa teks.',
            '*.role.max'              => 'Role maksimal 50 karakter.',

            '*.phone.string'          => 'Nomor telepon harus berupa teks.',
            '*.phone.max'             => 'Nomor telepon maksimal 255 karakter.',

            '*.status.in'             => 'Status harus salah satu dari: active, inactive.',

            '*.image.string'          => 'Image harus berupa teks.',
            '*.image.max'             => 'Image maksimal 255 karakter.',

            '*.password.string'       => 'Password harus berupa teks.',
            '*.password.min'          => 'Password minimal 6 karakter.',
        ];
    }
}
