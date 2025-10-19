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
        ->default('capybash-magicslider.height_desktop', '250')
        ->default('capybash-magicslider.height_mobile', '200')
        ->default('capybash-magicslider.padding_desktop', '0')
        ->default('capybash-magicslider.padding_mobile', '0')
        ->default('capybash-magicslider.radius_desktop', '0')
        ->default('capybash-magicslider.radius_mobile', '0')
        ->default('capybash-magicslider.autoplay', '0')
        ->default('capybash-magicslider.hide_on_tag_pages', '0')
        ->default('capybash-magicslider.fit_to_layout', '0')

        ->serializeToForum('capybash-magicslider.slides', 'capybash-magicslider.slides', 'strval')
        ->serializeToForum('capybash-magicslider.height_desktop', 'capybash-magicslider.height_desktop', 'intval')
        ->serializeToForum('capybash-magicslider.height_mobile', 'capybash-magicslider.height_mobile', 'intval')
        ->serializeToForum('capybash-magicslider.padding_desktop', 'capybash-magicslider.padding_desktop', 'intval')
        ->serializeToForum('capybash-magicslider.padding_mobile', 'capybash-magicslider.padding_mobile', 'intval')
        ->serializeToForum('capybash-magicslider.radius_desktop', 'capybash-magicslider.radius_desktop', 'intval')
        ->serializeToForum('capybash-magicslider.radius_mobile', 'capybash-magicslider.radius_mobile', 'intval')
        ->serializeToForum('capybash-magicslider.autoplay', 'capybash-magicslider.autoplay', 'intval')
        ->serializeToForum('capybash-magicslider.hide_on_tag_pages', 'capybash-magicslider.hide_on_tag_pages', 'boolval')
        ->serializeToForum('capybash-magicslider.fit_to_layout', 'capybash-magicslider.fit_to_layout', 'boolval'),
];