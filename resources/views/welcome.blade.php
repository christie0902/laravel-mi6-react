@extends('layouts.main')

@section('react-app')
    <div id="people-of-interest" class="app"></div>

    @viteReactRefresh
    @vite('resources/js/people-of-interest.jsx')
@endsection
