<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
      $user = Auth::user();

      if ( ($user->is_admin && session('odh_pin_logged')) || Route::current()->uri == 'admin/pin' )
        return $next($request);
      elseif ( $user->is_admin && ! session('odh_pin_logged'))
        return to_route('admin.pin');

      return to_route('dashboard');
    }
}
