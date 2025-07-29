<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEvaluasiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return  true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'penugasan_peer_id' => ['required', 'exists:penugasan_peers,id'],
            'catatan'           => ['nullable', 'string'],
            'nilai'             => ['required', 'array'],
            'nilai.*.kriteria_id' => ['required', 'exists:kriterias,id'],
            'nilai.*.skor'        => ['required', 'integer', 'between:0,100'],
        ];
    }
}
