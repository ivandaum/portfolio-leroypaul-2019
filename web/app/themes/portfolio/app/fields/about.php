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
    ->addEmail('about_email', ['label' => 'Email de contact'])
    ->addWysiwyg('about_description', ['label' => 'À propos de moi'])
    ->addRepeater('about_social_networks', [
      'label' => 'Réseaux sociaux',
      'button_label' => 'Ajouter un lien',
      'layout' => 'columns',
    ])
      ->addText('social_networks-name', ['placeholder' => 'Nom du réseau'])
      ->addUrl('social_networks-link', ['placeholder' => 'Lien vers le réseau'])
      // ->addSelect('experience_years')
      // ->addChoices($years)
      // ->setDefaultValue($years[0])
      // ->addText('about_experience-time', ['placeholder' => 'Période (exemple : '. $currentYear . '-' . ($currentYear-1) . ')'])
      // ->addText('about_experience-title', ['placeholder' => 'Intitulé'])
    ->endRepeater();
return $about;