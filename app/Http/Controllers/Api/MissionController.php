<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mission;

class MissionController extends Controller
{

    public function index() : string
    {
        return Mission::all()->toJson();
    }

    public function show(int $id) : string
    {
         return Mission::with([
            'people',
        ])->findOrFail($id)->toJson();
    }

    public function assignPerson(Request $request)
    {
        $missionId = $request->input('missionId');

        $mission = Mission::find($missionId);

        if (!$mission) {
            return response()->json(['message' => 'Mission not found'], 404);
        }

        $personId = $request->input('personId');


        $person = Person::find($personId);

        if (!$person) {
            return response()->json(['message' => 'Person not found'], 404);
        }

        $mission->people()->attach($personId);

        return response()->json(['message' => 'Person assigned to mission successfully'], 200);
    }
}
