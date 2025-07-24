<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePenugasanPeerRequest extends FormRequest
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
            'outsourcing_id' => [
                'required',
                'integer',
                'exists:users,id',
            ],
            'penilai_id' => [
                'required',
                'integer',
                'different:outsourcing_id', // tidak boleh menilai diri sendiri
                'exists:users,id',
            ],
            'type_penilai' => [
                'required',
                'in:teman,kabag,kabiro',
            ],
        ];
    }

    /**
     * Pesan custom untuk error
     */
    public function messages(): array
    {
        return [
            'outsourcing_id.required' => 'Pegawai yang dinilai wajib dipilih.',
            'outsourcing_id.integer' => 'ID pegawai yang dinilai harus berupa angka.',
            'outsourcing_id.exists' => 'Pegawai yang dinilai tidak ditemukan.',

            'penilai_id.required' => 'Penilai wajib dipilih.',
            'penilai_id.integer' => 'ID penilai harus berupa angka.',
            'penilai_id.exists' => 'Penilai tidak ditemukan.',
            'penilai_id.different' => 'Penilai tidak boleh orang yang sama dengan pegawai yang dinilai.',

            'type_penilai.required' => 'Tipe penilai wajib diisi.',
            'type_penilai.in' => 'Tipe penilai harus salah satu dari: teman, kabag, atau kabiro.',
        ];
    }
}
