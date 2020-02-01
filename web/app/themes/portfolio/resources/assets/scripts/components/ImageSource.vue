<template>
  <picture :class="className">
    <source 
      v-for="(source, i) in sources" 
      :srcset="source.url"
      :media="'(' + MEDIA_QUERIES[i].media + ')'" 
      :key="'image-responsive' + i"
      :type="type"
    >
    <img :src="lastEntry.url" :height="lastEntry.height" :width="lastEntry.width" :alt="alt" v-on:load="$emit('loaded')">
  </picture>
</template>

<script>
export default {
  name: 'ImageSource',
  data() {
      return {
        lastEntry: {},
        sources: [],
        type: null,
        alt: null,
        MEDIA_QUERIES: [
          {name: 'phone-s', media: 'max-width: 360px'},
          {name: 'phone', media: 'max-width: 768px'},
          {name: 'desktop', media: 'max-width: 1000px'},
          {name: 'widescreen', media: 'max-width: 1280px'},
          {name: 'max', media: 'min-width: 1281px'},
        ],
      }
  },
  props: {
    className: String,
    image: Object
  },
  mounted() {
    this.type = this.image.mime_type;
    this.alt = this.image.caption || this.image.description || this.image.title;
    this.sources = this.getSources();
    this.lastEntry = this.sources[this.sources.length - 1];
  },
  methods: {
    getSources() {
      let sizes = [];
      this.MEDIA_QUERIES.map( entry => {
        if (!this.image.sizes[entry.name]) return false;
        sizes.push({
          url: this.image.sizes[entry.name],
          width: this.image.sizes[entry.name + '-width'],
          height: this.image.sizes[entry.name + '-height'],
        })
      });
      return sizes;
    }
  }
}
</script>
<style lang="scss">
</style>