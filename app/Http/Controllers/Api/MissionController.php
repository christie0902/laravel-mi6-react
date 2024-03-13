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

}
