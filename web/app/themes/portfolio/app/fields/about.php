<?php

namespace App;

use StoutLogic\AcfBuilder\FieldsBuilder;

/**
 * Add Custom Admin page for general settings
 */
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
        'page_title' 	=> 'À propos',
        'menu_title'	=> 'À propos',
        'menu_slug' 	=> 'a-propos',
        'capability'	=> 'edit_posts',
        'redirect'		=> false,
        'position'    => 4
    ));
}

$currentYear = date('Y');
$years = [];
for($i = $currentYear; $i > $currentYear - 15; $i--) {
  $years[] = $i . ' - ' . ($i - 1);
}

$about = new FieldsBuilder('about');
$about
    ->setLocation('options_page', '==', 'a-propos')
    ->addText('about_title', ['label' => 'Titre'])
    ->addTextArea('about_description', ['label' => 'À propos de moi'])
    ->addRepeater('about_experiences', [
      'label' => 'Expériences',
      'button_label' => 'Ajouter une expérience',
      'layout' => 'columns',
    ])
      // ->addSelect('experience_years')
      // ->addChoices($years)
      // ->setDefaultValue($years[0])
      ->addText('about_experience-time', ['placeholder' => 'Période (exemple : '. $currentYear . '-' . ($currentYear-1) . ')'])
      ->addText('about_experience-title', ['placeholder' => 'Intitulé'])
    ->endRepeater();
return $about;