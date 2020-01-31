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

    $description = preg_replace('/<(p|span).*?>/', '<$1>', $about['description']);
    $description = preg_replace('/(<span>|<\/span>)/', '', $description);
    $cleaned = preg_replace('/<.*?>/', '', $description);
    $allWords = explode(' ', $cleaned);
    $words = array();
    foreach($allWords as $word) {
      if (!in_array($word, $words)) $words[] = trim($word);
    }

    foreach($words as $word) {
      $new = ' <span>'.$word.'</span> ';
      $matchs = array(
        ' '.$word.' ' => $new,
        '>'.$word => '>' . trim($new) . ' ',
        $word . '<' => ' ' . trim($new) . '<',
      );

      foreach($matchs as $m => $v) {
        if(preg_match("$$m$", $description)) {
          $description = str_replace($m, $v, $description);
          break;
        }
      }
    }

    $description = preg_replace('/<a(.*?)>/', '<a class="js-text-in" $1>', $description);
    $description = preg_replace('/<span>/', '<span class="js-text-in">', $description);

    $about['description'] = $description;
    return $about;
  }
}
