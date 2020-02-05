<?php

namespace App\Model;

class Project
{
  private static $instance = null;

  public function __construct() {}

  public static function getInstance() {
    if(is_null(self::$instance)) {
      self::$instance = new Project();
    }
    return self::$instance;
  }

  public static function getAll() {
    $args = [
      'posts_per_page' => -1,
      'post_type' => array(POST_TYPE__PROJECT)
    ];

    $query = new \WP_Query($args);
    return self::format($query->posts);
  }

  public static function format($array = []) {
    $output = [];

    foreach($array as $k => $p) {
      $f = [];
      $f['id'] = $p->ID;
      $f['url'] = \get_permalink($p->ID);
      $f['type'] = $p->post_type;
      $f['slug'] = $p->post_name;
      $f['title'] = $p->post_title;

      $f['preview_image'] = get_field('project_preview-image', $p->ID);
      $date = explode('/', get_field('project_date', $p->ID));

      $f['date'] = date('F Y', strtotime($date[1] .'/'. $date[0] .'/'. $date[2]));
      $f['subtitle'] = get_field('project_subtitle', $p->ID);
      $f['description'] = get_field('project_description',$p->ID);
      $f['client'] = get_field('project_client',$p->ID);
      $f['project_url'] = [
        'behance' => get_field('project_url-behance',$p->ID),
        'live' => get_field('project_url-live',$p->ID),
      ];

      $f['prev_project'] = get_previous_post();
      $f['next_project'] = get_next_post();

      $content = get_field('project_content', $p->ID) ?: [];
      $f['content'] = [];
      foreach($content as $c) {
        $entry = [];
        $type = !isset($c['disposition']) ?: $c['disposition'];
        $entry = [
          'type' => $type,
          'image' => $c['image'],
        ];
        $f['content'][] = $entry;
      }
      
      $output[] = $f;
    }
    return $output;
  }
}
