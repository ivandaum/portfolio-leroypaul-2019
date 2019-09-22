<!doctype html>
<html {!! get_language_attributes() !!}>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    @php wp_head() @endphp
  </head>
  <body>
    <script type="text/javascript">
      window.PROJECTS={!!json_encode($projects)!!};
      window.ABOUT={!!json_encode($about)!!};
    </script>
    <div class="App" id="app"></div>
  </body>
</html>
