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

            // Penilai
            'penilai.id' => [
                'required',
                'integer',
                'different:outsourcing.id',
                'exists:users,id',
            ],
            'penilai.name' => [
                'required',
                'string',
                'max:255',
            ],
            'penilai.type' => [
                'required',
                'in:teman,kabag,kabiro',
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

            // penilai
            'penilai.id.required' => 'ID penilai wajib diisi.',
            'penilai.id.integer'  => 'ID penilai harus berupa angka.',
            'penilai.id.exists'   => 'Penilai tidak ditemukan.',
            'penilai.id.different' => 'Penilai tidak boleh sama dengan outsourcing yang dinilai.',

            'penilai.name.required' => 'Nama penilai wajib diisi.',
            'penilai.name.string'   => 'Nama penilai harus berupa teks.',
            'penilai.name.max'      => 'Nama penilai maksimal 255 karakter.',

            'penilai.type.required' => 'Tipe penilai wajib diisi.',
            'penilai.type.in'       => 'Tipe penilai harus salah satu dari: teman, kabag, atau kabiro.',
        ];
    }
}
