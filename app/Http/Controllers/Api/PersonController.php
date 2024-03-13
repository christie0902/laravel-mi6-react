<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestEmail;
use Auth;
use App\Notifications\TestNotification;
use App\Models\User;
use Illuminate\Support\Facades\Notification;


class PersonController extends Controller
{
    public function index(Request $request)
    {
        $statusQueryParam = $request->query('status');

        if (empty($statusQueryParam)) {
            $people = Person::with(['image', 'status', 'aliases'])->get();
        } else {
            $people = Person::with(['image', 'status', 'aliases'])
                ->whereHas('status', function ($query) use ($statusQueryParam) {
                    $query->where('id', $statusQueryParam);
                })
                ->get();
        }

        return compact('people');
    }

    public function show($person_id)
    {

        $person = Person::with([
            'image',
            'status',
            'aliases'
        ])->findOrFail($person_id);

        return compact('person');
    }
}
