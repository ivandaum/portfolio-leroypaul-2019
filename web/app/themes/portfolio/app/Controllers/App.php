<?php

namespace App\Controllers;

use Sober\Controller\Controller;

\App\Model\Project::getInstance();

class App extends Controller
{
    public function projects() {
      return\App\Model\Project::getAll();
    }

    public function about() {
      return \App\Model\About::getInformations();
    }

    public function title() {
      return get_bloginfo('title');
    }
}
