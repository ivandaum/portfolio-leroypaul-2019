<?php

namespace App\Model;

class About
{
  private static $instance = null;

  public function __construct() {}

  public static function getInstance() {
    if(is_null(self::$instance)) {
      self::$instance = new Project();
    }
    return self::$instance;
  }

  public static function getInformations() {
    $about = [];
    $about['title'] = get_field('about_title','options');
    $about['email'] = get_field('about_email','options');
    $about['picture'] = get_field('about_picture','options');
    $about['description'] = get_field('about_description','options');
    $about['social_networks'] = [];

    $content = get_field('about_social_networks', 'options') ?: [];
    foreach($content as $c) {
      $about['social_networks'][] = [
        'name' => $c['social_networks-name'],
        'url' => $c['social_networks-link']
      ];
    }
    return $about;
  }
}
