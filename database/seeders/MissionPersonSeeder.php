<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mission;
use App\Models\Person;

class MissionPersonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $missions = Mission::all();
        $people = Person::all();

        foreach ($missions as $mission) {
            $selectedPeople = $people->random(rand(1, $people->count()));

            foreach ($selectedPeople as $person) {
                $mission->people()->attach($person);
            }
        }
    }
}
