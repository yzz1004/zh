<template>
  <div class="articleList" ref="articleList">
    <div v-for="(items, index) in articleList" :key='index'>
      <div class="date">{{showDay(index)}}</div>
      <div v-for="item in items" class="list" :key="item.id">
        <article @click="showArticle(item.id)" class="story">
          <span class="text">{{item.title}}</span>
          <img :src="item.images" class="image">
        </article>
      </div>
    </div>
    <div v-show="loading" class="infinite-scroll">
      <svg class="loader-circular" viewBox="25 25 50 50">
        <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="rgb(53, 157, 218)" stroke-width="5"></circle>
      </svg>
      <span class="infinite-scroll-text">{{tips}}</span>
    </div>
  </div>
</template>
<script type="text/javascript">
import API from '../../common/api/API'
export default {
  data: function() {
    return {
      articleList: [],
      date: [],
      todayDate: '',
      require: true,
      loading: false,
      tips: '努力加载中...',
      name:'首页'
    };
  },
  watch:{
    toptit(){
      this.$emit('changeTit',this.todayDate)
    },
  },
  created() {},
  mounted() {
    // 获取今日新闻
    this.$axios({
      url:API.Ndatas
    }).then((d) => {
      this.date.push(d.data['date']);
      this.articleList.push(d.data['stories']);
      this.todayDate = d.data['date'];
    });
    // 添加滚动事件，检测滚动到页面底部
    window.addEventListener('scroll', this.scrollBottom);
  },
  methods: {
    scrollBottom() {
      // 滚动到页面底部时，请求前一天的文章内容
      // 屏幕高度+滚动条的高度大于页面高度
      if (((document.body.clientHeight + document.documentElement.scrollTop+20) > (document.body.offsetHeight)) && this.require) {
        // 请求的数据未加载完成时，滚动到底部不再请求前一天的数据
        this.require = false;
        this.loading = true;
        this.tips = '努力加载中...';  
        this.$axios({
          url:API.Nformerly+this.todayDate
        }).then((d) => {              
          this.articleList.push(d.data['stories']);
          this.date.push(d.data['date']);
          this.todayDate = d.data['date'];
          // 请求的数据加载完成后，再次滚动到底部时，允许请求前一天数据
          this.$nextTick(() => {
            this.require = true;
            this.loading = false;
          });
        }).catch(() => {
          this.tips = '连接失败，请稍后重试';
          // 请求失败时，将 REQUIRE 置为 true，滚动到底部时，再次请求
          this.REQUIRE = true;
        });
      };
      
    },
    showArticle(id) {
      // 跳转到动态路由
      this.$router.push('/article/' + id);
    },
    showDay(index) {
      if (index === 0) {
        return '今日新闻';
      } else {
        return this.getToday(index);
      }
    },
    getToday(index) {
      let year = this.date[index].slice(0, 4);
      let month = this.date[index].slice(4, 6);
      let day = this.date[index].slice(6);
      let today = new Date(year + '/' + month + '/' + day);
      let week = ['日', '一', '二', '三', '四', '五', '六'];
      return month + '月' + day + '日' + ' 星期' + week[today.getDay()];
    },
    
    addZero(value) {
      return value < 10 ? '0' + value : value;
    },
  }
};
</script>
<style lang="stylus" type="text/css">
@import '../../common/stylus/index.styl';


.articleList {
  width: 100%;
  background: rgba(240, 240, 240, 0.8);
  .date {
    height: 40px;
    padding-left: 20px;
    line-height: 40px;
    font-size: 14px;
    color: rgba(12, 12, 12, 0.9);
  }
  .list {
    margin: 0 .1rem;
    .story {
      display: flex;
      width: 100%;
      margin-bottom: .15rem;
      padding: .14rem;
      box-sizing: border-box;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 1px 1px 1px #ccc;
      .text {
        flex: 1;
        padding-right: .1rem;
        font-size: .3rem;
        line-height: .4rem;
      }
      .image {
        flex: 0 0 auto;
        height: 1.3rem;
      }
    }
  }
  .infinite-scroll {
    position: relative;
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    .loader-circular {
      display: inline-block;
      vertical-align: middle;
      width: .4rem;
      height: .4rem;
      animation: rotate 2s linear infinite;
      .loader-path {
        animation: dash 1.5s linear infinite;
      }
    }
    .infinite-scroll-text {
      margin-left: .1rem;
      font-size: .3rem;
    }
  }
}
</style>