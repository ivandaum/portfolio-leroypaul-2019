<?php

namespace App\Controllers;

use Sober\Controller\Controller;

\App\Model\Project::getInstance();

class Api extends Controller
{

    public function __construct() {
      $projects = \App\Model\Project::getLast();
      return json_encode(array(
        'projects' => $projects,
        'about' => [],
        'title' => get_bloginfo('title')
      ));
    }
}
