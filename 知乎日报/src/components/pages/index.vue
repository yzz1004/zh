<template>
  <div class="wrapper">
    <header class="header clearfix">
      <div class="hd_left">
        <span @touchend="mask()" class="iconfont icondaohang"></span>
        <span>{{name}}</span>
      </div>
      <div class="hd_right">
        <span class="ling iconfont iconxiaoxitongzhitixinglingshenglingdang-xianxing"></span>
        <span class="more iconfont icondashujukeshihuaico-"></span>
      </div>
    </header>
    <mt-swipe class="banner" :auto="4000">
      <mt-swipe-item v-for="item in topstories" :key="item.id">
        <img @touchstart="goComments(item.id)" :src="item.image" alt>
        <p class="msg">{{item.title}}</p>
      </mt-swipe-item>
    </mt-swipe>
    <v-news></v-news>
    <div class="mask"  @touchmove="move($event)" @touchend="end($event)">
      <div class="con">
        <div class="con_header">
          <img src="http://img.qqzhi.com/uploads/2019-04-29/191416264.jpg" alt>
          <p>请登录</p>
          <div class="con_msg">
            <span class="iconfont iconstar shoucang" @touchstart="goCollection()">&nbsp;我的收藏</span>
            <span class="iconfont iconxiazai1 shoucang">&nbsp;离线下载</span>
          </div>
        </div>
        <div class="home">
          <span class="iconfont iconshouye"></span>
          首页
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/api/API";
import vNews from "../views/news";
export default {
  components: {
    vNews
  },
  props: {},
  data() {
    return {
      topstories: [],
      name:'首页',
      startX:0,
      endX:0,
      startY:0,
      endY:0
    };
  },
  watch: {},
  computed: {},
  methods: {
    goCollection(){
      this.$router.push('/collection')
    },
    mask() {
      var mask = document.querySelector(".mask");
      mask.style.left = 0;
    },
    goComments(id) {
      this.$router.push("/article/" + id);
    },
    end(e){
      var target=e.target;
      var mask=document.querySelector('.mask')
      if(target.className=="mask"){
        console.log(11111)
        mask.style.left="-100%"
      }
    },
    move(e){
      e.preventDefault()
    }
  },

  mounted() {
    this.$axios({
      url: API.Ndatas
    }).then(d => {
      //   console.log(d);
      this.topstories = d.data.top_stories;
      this.stories = d.data.stories;
    });
    var that=this;
    window.onscroll=function(){
      var wh =
        document.documentElement.clientHeight || document.body.clientHeight; //窗口的高度
      var st = document.documentElement.scrollTop || document.body.scrollTop; //上卷的距离
      var dc = document.querySelector('.mint-swipe-items-wrap');
      var dch = dc.offsetHeight;
      // console.log(dch)
      if(st<dch){
        that.name ="首页"
      }else{
        var times = document.querySelectorAll('.date')
        for(var i=0;i<times.length;i++){
          if(times[i].getBoundingClientRect().top<st+wh){
            that.name = times[i].innerHTML;
            // console.log(times[i])
          }
        }
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.wrapper {
  background: #f3f3f3;
}

.mask {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: -100%;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}

.con {
  width: 80%;
  height: 100vh;
  background: #fff;

  .home {
    font-size: 0.3rem;
    color: #00a2ed;
    height: 1rem;
    background: #f0f0f0;
    line-height: 1rem;
    padding-left: 0.4rem;

    span {
      font-size: 0.4rem;
      padding-right: 0.2rem;
    }
  }

  .con_header {
    height: 2.3rem;
    background: #00a2ed;
    color: #fff;
    font-size: 0.3rem;

    p {
      padding-left: 0.2rem;
      display: inline-block;
      padding-bottom: 0.15rem;
    }

    .con_msg {
      margin-left: 0.1rem;
      margin-top: 0.6rem;
      font-size: 0.3rem;

      span {
        font-size: 0.3rem;
      }

      .shoucang {
        margin-left: 0.3rem;
        font-weight: bold;
      }
    }
  }

  img {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    margin-top: 0.2rem;
    margin-left: 0.3rem;
  }
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
  }

  .hd_right {
    float: right;

    .ling {
      font-size: 0.4rem;
      margin-right: 0.7rem;
    }

    .more {
      font-size: 0.4rem;
      margin-right: 0.3rem;
    }
  }
}

.banner {
  position: relative;
  padding-top: 1rem;
  width: 100vw;
  height: 4rem;

  img {
    width: 100%;
    height: 100%;
  }
}

>>>.msg[data-v-c2ce7532] {
  position: absolute;
  bottom: 0.5rem;
  left: 0.3rem;
  width: 90%;
  margin-left: 0.5rem;
  font-size: 0.4rem;
  color: #fff;
  line-height: 0.5rem;
}

>>>.mint-swipe-indicator {
  opacity: 0.8;
}
</style>
