<template>
  <div class="wrapper">
    <header class="header clearfix">
      <div class="hd_left">
        <span @touchstart="back()" class="iconfont iconzuojiantou back"></span>
        <span>{{arr.length}} 条收藏</span>
      </div>
    </header>
    <div class="collection_wrap">
      <div class="collection" v-for="(item,index) in arr" :key="index" @touchstart="goComment(item.id)">
        <span class="text">{{item.title}}</span>
        <img :src="item.images" class="image">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {
      arr: []
    };
  },
  watch: {},
  computed: {},
  methods: {
      goComment(id){
          this.$router.push('/article/'+id)
      },
      back(){
          this.$router.push('/index')
      }
  },
  mounted() {
    var arr = localStorage.getItem("arr")
      ? JSON.parse(localStorage.getItem("arr"))
      : [];
    this.arr = arr;
    console.log(arr);
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.wrapper {
  width: 100%;
}

.header {
  position: fixed;
  z-index: 2;
  width: 100vw;
  height: 1rem;
  background: $bgHeader;
  line-height: 1rem;
  color: $hdColor;

  .hd_left {
    float: left;

    span {
      margin-left: $marginL;
      font-size: 0.3rem;
    }
    .back{
        font-size:.4rem
    }
  }
}

.collection_wrap {
  padding-top: 1rem;

  .collection {
   display: flex;
      width: 95%;
      margin: .08rem auto .15rem;
      padding: .14rem;
      box-sizing: border-box;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 1px 1px 1px #ccc;
    .image {
      height:1.3rem
      float:right
    }
    .text{
        flex: 1;
        padding-right: .1rem;
        font-size: .3rem;
        line-height: .4rem;
    }
  }
}
</style>
