<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;

class AdminController extends Controller
{
     public function users()
    {
        $users = User::select('id','name','email','role','created_at')
            ->latest()
            ->get();

        return response()->json($users);
    }
}
