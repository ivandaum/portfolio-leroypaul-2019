<?php
namespace App;
use StoutLogic\AcfBuilder\FieldsBuilder;
$post = new FieldsBuilder(POST_TYPE__PROJECT);
$post
  ->setLocation('post_type', '==', POST_TYPE__PROJECT)
  ->addTab('Informations')
  ->addImage('project_preview-image',['label' => 'Image de prévisualisation'])
  ->addDatePicker('project_date',['label' => 'Date de publication'])
  ->addText('project_subtitle',['label' => 'Sous-titre'])
  ->addTextArea('project_description',['label' => 'Description'])
  ->addText('project_client',['label' => 'Client'])
  ->addTab('Liens')
  ->addUrl('project_url-behance',['label' => 'Lien Behance'])
  ->addUrl('project_url-live',['label' => 'Lien du site'])
  ->addTab('Contenu')
  ->addRepeater('project_content', [
    'label' => 'Médias',
    'button_label' => 'Ajouter un média',
    'layout' => 'columns',
  ])
  ->addSelect('disposition')
    ->addChoice('center')
    ->addChoice('full')
    ->setDefaultValue('center')
  ->addImage('image', [
    'label' => 'Image',
  ])
  ->endRepeater();
return $post;