<?php
    return [
        'starlink' => [
            'residential' => [
                'name' => 'Residential Roaming',
                'type' => 'personal'
            ],
            'mobile' => [
                'name' => 'Mobile Priority',
                'type' => 'business'
            ],
            'global' => [
                'name' => 'Global',
                'type' => 'business'
            ],
        ],
        'starlink_categories' => env('STARLINK_CATEGORIES', ''),
        'first_four' => [
            'mtn' => env('MTN_FOURS', ''),
            'glo' => env('GLO_FOURS', ''),
            'airtel' => env('AIRTEL_FOURS', ''),
            'nine_mobile' => env('NINE_MOBILE_FOURS', ''),
        ]
    ];
