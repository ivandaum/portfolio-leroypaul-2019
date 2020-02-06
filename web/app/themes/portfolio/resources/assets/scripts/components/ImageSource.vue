<template>
  <picture :class="{className}" :style="{transform: 'scale(' + getImgScale() +')', paddingTop: lazy ? lastEntry.height / lastEntry.width * 100 + '%' : 0}">
    <source 
      v-for="(source, i) in sources" 
      :srcset="!lazy ? source.url : false"
      :data-srcset="lazy ? source.url : false"
      :media="'(' + MEDIA_QUERIES[i].media + ')'" 
      :key="'image-responsive' + i"
      :type="type"
    >
    <img 
      :style="{transform: 'scale(' + getImgScale(true) +')'}"
      :width="lastEntry.width" 
      :height="lastEntry.height" 
      :src="!lazy ? lastEntry.url : false" 
      :data-src="lazy ? lastEntry.url : false" 
      :class="{'js-lazy': lazy}" 
      :alt="alt" 
      v-on:load="$emit('loaded')"
    />
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
        localRatio: [],
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
    image: Object,
    lazy: Boolean,
    isPreview: Boolean,
    ratio: Array
  },
  mounted() {
    this.type = this.image.mime_type;
    this.alt = this.image.caption || this.image.description || this.image.title;
    this.sources = this.getSources();
    this.lastEntry = this.sources[this.sources.length - 1];
    this.localRatio = this.ratio;
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

      if (this.isPreview) {
        sizes[0] = sizes[1] = sizes[2]; // fix preview definition on smartphones - prevent being too low
      }

      return sizes;
    },
    getImgScale(inverted) {
      const ratio = this.ratio ? this.ratio : [1, 1];
      if (inverted) {
        return 1 / ratio[0] + ', ' + 1 / ratio[1];
      } else {
        return ratio[0] + ', ' + ratio[1];
      }
    }
  }
}
</script>
<style lang="scss">
</style>