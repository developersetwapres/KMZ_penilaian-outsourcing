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
            // Outsourcing yang dinilai
            'outsourcing.id' => [
                'required',
                'integer',
                'exists:users,id',
            ],
            'outsourcing.name' => [
                'required',
                'string',
                'max:255',
            ],

            // Penilai Atasan
            'penilai.atasan.id' => [
                'required',
                'integer',
                'different:outsourcing.id',
                'exists:users,id',
            ],
            'penilai.atasan.name' => [
                'required',
                'string',
                'max:255',
            ],


            // Penilai Penerima Layanan
            'penilai.penerima_layanan.id' => [
                'required',
                'integer',
                'different:outsourcing.id',
                'exists:users,id',
            ],
            'penilai.penerima_layanan.name' => [
                'required',
                'string',
                'max:255',
            ],


            // Penilai Teman
            'penilai.teman.id' => [
                'required',
                'integer',
                'different:outsourcing.id',
                'exists:users,id',
            ],
            'penilai.teman.name' => [
                'required',
                'string',
                'max:255',
            ],

        ];
    }


    public function messages(): array
    {
        return [
            // outsourcing
            'outsourcing.id.required' => 'ID outsourcing wajib diisi.',
            'outsourcing.id.integer'  => 'ID outsourcing harus berupa angka.',
            'outsourcing.id.exists'   => 'Outsourcing tidak ditemukan.',
            'outsourcing.name.required' => 'Nama outsourcing wajib diisi.',
            'outsourcing.name.string'   => 'Nama outsourcing harus berupa teks.',
            'outsourcing.name.max'      => 'Nama outsourcing maksimal 255 karakter.',

            // Penilai Atasan
            'penilai.atasan.id.required' => 'ID atasan wajib diisi.',
            'penilai.atasan.id.integer'  => 'ID atasan harus berupa angka.',
            'penilai.atasan.id.exists'   => 'Atasan tidak ditemukan.',
            'penilai.atasan.id.different' => 'Atasan tidak boleh sama dengan outsourcing yang dinilai.',
            'penilai.atasan.name.required' => 'Nama atasan wajib diisi.',
            'penilai.atasan.name.string'   => 'Nama atasan harus berupa teks.',
            'penilai.atasan.name.max'      => 'Nama atasan maksimal 255 karakter.',

            // Penilai Penerima Layanan
            'penilai.penerima_layanan.id.required' => 'ID penerima layanan wajib diisi.',
            'penilai.penerima_layanan.id.integer'  => 'ID penerima layanan harus berupa angka.',
            'penilai.penerima_layanan.id.exists'   => 'Penerima layanan tidak ditemukan.',
            'penilai.penerima_layanan.id.different' => 'Penerima layanan tidak boleh sama dengan outsourcing yang dinilai.',
            'penilai.penerima_layanan.name.required' => 'Nama penerima layanan wajib diisi.',
            'penilai.penerima_layanan.name.string'   => 'Nama penerima layanan harus berupa teks.',
            'penilai.penerima_layanan.name.max'      => 'Nama penerima layanan maksimal 255 karakter.',

            // Penilai Teman
            'penilai.teman.id.required' => 'ID teman wajib diisi.',
            'penilai.teman.id.integer'  => 'ID teman harus berupa angka.',
            'penilai.teman.id.exists'   => 'Teman tidak ditemukan.',
            'penilai.teman.id.different' => 'Teman tidak boleh sama dengan outsourcing yang dinilai.',
            'penilai.teman.name.required' => 'Nama teman wajib diisi.',
            'penilai.teman.name.string'   => 'Nama teman harus berupa teks.',
            'penilai.teman.name.max'      => 'Nama teman maksimal 255 karakter.',
        ];
    }
}
