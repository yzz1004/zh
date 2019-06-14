<template>
  <div class="wrapper">
    <header class="header">
      <div>
        <span @click="back()" class="iconfont iconzuojiantou back"></span>
        <span class="iconfont iconfenxiang3 share"></span>
        <span
          :class="[iscollect?'iconfont iconstar shoucang yellow':'iconfont iconstar shoucang']"
          @touchstart="collection()"
        ></span>
        <span class="iconfont iconlinedesign-01 pinglun">
          <i class="msg" @click="comments(article.id)">{{extraInfo.comments}}</i>
        </span>
        <span class="iconfont icondianzan zan">
          <i class="msg">{{extraInfo.popularity}}</i>
        </span>
      </div>
    </header>
    <div class="content-wrapper">
      <div class="image-wrapper">
        <span class="title">{{article.title}}</span>
        <span class="image-source">{{article.image_source}}</span>
        <img :src="article.image" class="image">
      </div>
      <div v-html="article.body" class="article-body"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/api/API";

export default {
  components: {},
  props: {},
  data() {
    return {
      article: "",
      extraInfo: "",
      iscollect: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    back() {
      //   this.$router.push("/index");
      this.$router.go(-1);
    },
    comments(id) {
      this.$router.push("/comments/" + id);
    },
    collection() {
      var arr = localStorage.getItem("arr")
        ? JSON.parse(localStorage.getItem("arr"))
        : [];
      if (arr.some(item => item.id == this.$route.params.id)) {
        this.iscollect = false;
        for (var i = 0; i < arr.length; i++) {
          if ((arr[i].id = this.$route.params.id)) {
            arr.splice(i, 1);
            break;
          }
        }
      } else {
        this.iscollect = true;
        arr.push({
          title: this.article.title,
          images: this.article.image,
          id: this.$route.params.id
        });
      }
      localStorage.setItem("arr", JSON.stringify(arr));
    }
  },
  mounted() {
    var id = this.$route.params.id;
    var arr = localStorage.getItem("arr")
      ? JSON.parse(localStorage.getItem("arr"))
      : [];
    if (arr.some(item => item.id == this.$route.params.id)) {
      this.iscollect = true;
    } else {
      this.iscollect = false;
    }
    // 获得点赞数
    this.$axios({
      url: API.Nextra + id
    }).then(d => {
      // console.log(d);
      this.extraInfo = d.data;
    });
    this.$axios({
      url: API.Nget + id
    }).then(d => {
      // console.log(d);
      this.article = d.data;
    });
  }
};

</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

>>>.headline .img-place-holder {
  height: 0;
}

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

    .msg {
      font-size: 0.2rem;
      display: inline-block;
      margin-bottom: 0.2rem;
    }
  }

  .back {
    margin-left: 0.3rem;
  }

  .share {
    margin-left: 3.8em;
  }

  .shoucang {
    margin-left: 0.5rem;
  }

  .yellow {
    color: yellow;
  }

  .pinglun {
    margin-left: 0.4rem;
  }

  .zan {
    margin-left: 0.4rem;
  }
}

.image-wrapper {
  position: relative;
  overflow: hidden;

  .title {
    position: absolute;
    bottom: 0.7rem;
    left: 0;
    padding: 0 0.2rem;
    font-size: 0.4rem;
    line-height: 0.45rem;
    color: #fff;
    z-index: 2;
  }

  .image-source {
    position: absolute;
    bottom: 0.25rem;
    right: 0.3rem;
    color: #fff;
  }
}

.image {
  width: 100%;
}

>>>.content-image {
  width: 100%;
}

ul, ol {
  list-style: decimal;
}

.article-body {
  .main-wrap {
    .headline {
      height: 0;
      border: none;
    }
  }
}
</style>
