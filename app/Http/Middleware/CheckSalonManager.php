<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\SystemRole;
use App\Models\SalonRole;
use DB;

class CheckSalonManager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse) $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        $selectedSalonId = $request->session()->get('selectedSalon');
        $salonRoleId =  DB::table('salon_user')->where('user_id', $user->id)->where('salon_id', $selectedSalonId)
            ->get()->first()->salon_role_id;

        if ($user && SystemRole::find($user->system_role_id)->name == 'user' &&
            SalonRole::find($salonRoleId)->name == 'manager') {
            return $next($request);
        }

        abort(401);
    }
}
