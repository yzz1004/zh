<template>
  <div class="wrapper">
    <header class="header clearfix">
      <div>
        <span @click="back()" class="iconfont iconzuojiantou back"></span>
        <span class="allComments">{{shortComments.length+longComments.length}} 条点评</span>
        <span class="iconfont iconpinglun write"></span>
      </div>
    </header>
    <div class="longComments">
      <div class="border">
        <span class="tit">{{longComments.length}} 条长评</span>
      </div>
      <img v-if="longComments==''" src="../../../static/shafa.jpg" alt="">
      <div class="con" v-for="(item,index) in longComments" :key="index">
        <img :src="item.avatar" alt>
        <span class="name">{{item.author}}</span>
        <div class="neirong">
          <span>{{item.content}}</span>
          <p class="time">{{item.time|filtertime}}</p>
        </div>
      </div>
    </div>

    <div class="shortComments" >
      <div class="border" >
        <span class="tit">{{shortComments.length}} 条短评</span>
        <span class="iconfont iconxiangxiajiantou gogo" @touchstart="change()"></span>
      </div>
      <div class="con" v-for="(item,index) in shortComments" :key="index" v-show="show">
        <img :src="item.avatar" alt>
        <span class="name">{{item.author}}</span>
        <div class="neirong">
          <span>{{item.content}}</span>
          <p class="time">{{item.time|filtertime}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/api/API";
// v-for="(item,index) in longComments" :key="index"
export default {
  components: {},
  props: {},
  data() {
    return {
      longComments: "",
      shortComments: "",
      show: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    back() {
      //   var commoentid = this.$route.params.id;
      //   this.$router.push("/article/" + commoentid);
      this.$router.go(-1);
    },
    change() {
      this.show = !this.show;
    }
  },
  filters: {
    filtertime(time) {
      var date = new Date(time * 1000);
      var month =
        date.getMonth() + 1 > 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      var day = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
      var hours =
        date.getHours() > 10 ? date.getHours() : "0" + date.getUTCHours();
      var minutes =
        date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes();
      return `${month}-${day} ${hours}:${minutes}`;
    }
  },
  mounted() {
    var commentid = this.$route.params.id;
    // console.log(commoentid);
    this.$axios({
      url: API.Nlength + commentid + "/long-comments"
    }).then(d => {
      console.log(d);
      this.longComments = d.data.comments;
    });
    this.$axios({
      url: API.Nshort + commentid + "/short-comments"
    }).then(d => {
      console.log(d);
      this.shortComments = d.data.comments;
    });
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.header {
  position: fixed;
  z-index: 2;
  width: 100vw;
  height: 1rem;
  background: $bgHeader;
  line-height: 1rem;
  color: $hdColor;

  span {
    font-size: 0.4rem;
  }

  .back {
    margin-left: 0.3rem;
  }

  .allComments {
    margin-left: 0.5rem;
  }

  .write {
    float: right;
    margin-right: 0.3rem;
  }
}

.longComments {
  padding-top: 1rem;
  img{
    width:100%
    height 80%
    border-bottom 1px solid #dbdbdb
  }
}

.gogo {
  float: right;
  margin-top: 0.25rem;
  margin-right: 0.2rem;
}

.tit {
  display: inline-block;
  height: 0.8rem;
  font-size: 0.3rem;
  color: #363636;
  line-height: 0.8rem;
  padding-left: 0.2rem;
}

.con {
  border-bottom: 1px solid #dbdbdb;

  img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    margin-left: 0.2rem;
    margin-top: 0.2rem;
  }

  .name {
    font-size: 0.3rem;
    font-weight: bold;
    color: #070707;
  }

  .neirong {
    margin: 0;
    display: block;
    width: 80%;
    font-size: 0.3rem;
    line-height: 0.4rem;
    margin-left: 1rem;

    p {
      font-size: 0.2rem;
      color: #bcbcbc;
    }
  }
}

.border {
  border-bottom: 1px solid #dbdbdb;
}
</style>
