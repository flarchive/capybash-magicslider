<?php

namespace Capybash\MagicSlider;

use Flarum\Extend;

return [
    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/resources/less/forum.less')
        ->js(__DIR__ . '/js/dist/forum.js'),

    (new Extend\Frontend('admin'))
        ->css(__DIR__ . '/resources/less/admin.less')
        ->js(__DIR__ . '/js/dist/admin.js'),

    (new Extend\Settings())
        ->default('capybash-magicslider.slides', '[]')
        ->default('capybash-magicslider.height_desktop', '260')
        ->default('capybash-magicslider.height_mobile', '200')
        ->default('capybash-magicslider.padding', '0')
        ->default('capybash-magicslider.radius', '0')
        ->default('capybash-magicslider.autoplay', '0')
        ->default('capybash-magicslider.hide_on_tags', false)
        ->serializeToForum('capybash-magicslider.slides', 'capybash-magicslider.slides', 'strval')
        ->serializeToForum('capybash-magicslider.height_desktop', 'capybash-magicslider.height_desktop', 'intval')
        ->serializeToForum('capybash-magicslider.height_mobile', 'capybash-magicslider.height_mobile', 'intval')
        ->serializeToForum('capybash-magicslider.padding', 'capybash-magicslider.padding', 'intval')
        ->serializeToForum('capybash-magicslider.radius', 'capybash-magicslider.radius', 'intval')
        ->serializeToForum('capybash-magicslider.autoplay', 'capybash-magicslider.autoplay', 'intval')
        ->serializeToForum('capybash-magicslider.hide_on_tags', 'capybash-magicslider.hide_on_tags', 'boolval'),
];