<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IspSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('isps')->insert([
            ['name' => 'MTN'],
            ['name' => 'Glo'],
            ['name' => 'Airtel'],
            ['name' => '9Mobile']
        ]);
    }
}
