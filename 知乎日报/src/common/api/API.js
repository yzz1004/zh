var baseUrl = '/api';


var Nformerly = baseUrl + '/api/4/news/before/' // 过往消息 5
var Ndatas = baseUrl + '/api/4/news/latest' // 最新消息 3
var Nget = baseUrl + '/api/4/news/' // 消息内容获取与离线下载 4
var Nextra = baseUrl + '/api/4/story-extra/' // 新闻额外消息 6
var Nlength = baseUrl + '/api/4/story/' // 新闻对应长评论查看 7
var Nshort = baseUrl + '/api/4/story/' // 新闻对应短评论查看 8


export default{
    Nformerly,
    Ndatas,
    Nget,
    Nextra,
    Nlength,
    Nshort
}