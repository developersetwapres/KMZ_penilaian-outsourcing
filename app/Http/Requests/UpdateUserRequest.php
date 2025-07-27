<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'lokasi_kerja' => 'required|string|max:255',
            'unit_kerja' => 'required|string|max:255',
            'perusahaan' => 'required|string|max:255',
            'role' => 'required|string|max:50',
            'phone' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
            'image' => 'required|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah digunakan.',
            'jabatan.required' => 'Jabatan wajib diisi.',
            'lokasi_kerja.required' => 'Lokasi kerja wajib diisi.',
            'unit_kerja.required' => 'Unit kerja wajib diisi.',
            'perusahaan.required' => 'Perusahaan wajib diisi.',
            'role.required' => 'Role wajib diisi.',
            'phone.required' => 'Nomor telepon wajib diisi.',
            'status.required' => 'Status wajib diisi.',
            'status.in' => 'Status harus bernilai active atau inactive.',
            'image.required' => 'Image wajib diisi.',
            'image.max' => 'Link gambar tidak boleh lebih dari 1000 karakter.',
            'password.required' => 'Password wajib diisi.',
            'password.min' => 'Password minimal 6 karakter.',
        ];
    }
}
