<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StartWiridRequest extends FormRequest
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
            'wirid_name' => 'required|string|max:255|in:Yaa Nur,Yaa Haqq,La Hawla,Asmaul Husna',
            'intention' => 'nullable|string|max:500',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'wirid_name.required' => 'Pilih jenis wirid yang akan diamalkan.',
            'wirid_name.in' => 'Jenis wirid yang dipilih tidak valid.',
            'intention.max' => 'Niat tidak boleh lebih dari 500 karakter.',
        ];
    }
}