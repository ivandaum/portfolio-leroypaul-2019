<template>
  <div>
    <picture :class="className">
      <source 
        v-for="(source, i) in sources" 
        :srcset="source.url"
        :media="'(min-width: ' + MEDIA_QUERIES[i].width + 'px)'" 
        :key="'image-responsive' + i"
        :type="type"
      >
      <img :src="lastEntry.url" :height="lastEntry.height" :width="lastEntry.width" :alt="alt">
    </picture>
  </div>
</template>

<script>
export default {
  name: 'ImageResponsive',
  data() {
      return {
        lastEntry: {},
        sources: [],
        type: null,
        alt: null,
        MEDIA_QUERIES: [
          {name: 'medium', width: 768},
          {name: 'large', width: 1000},
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