(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b914be4c"],{5599:function(t,a,i){"use strict";i.r(a);var s=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"rankinglist"},[t.showLoading?s("div",{staticClass:"loading"},[s("img",{attrs:{src:i("4045")}})]):t._e(),s("van-nav-bar",{attrs:{title:"排行榜","left-text":"返回","left-arrow":""}}),s("div",{staticClass:"content"},[s("van-tabs",{on:{click:t.TabsMove},model:{value:t.active,callback:function(a){t.active=a},expression:"active"}},t._l(t.dataArr,(function(a,i){return s("van-tab",{key:i,attrs:{title:a.name}},[s("div",{staticClass:"ranking-content clearfix"},[s("div",{ref:"left",refInFor:!0,staticClass:"left fl",attrs:{value:t.i2}},t._l(a.data,(function(a,i){return s("div",{key:i,class:t.top_index==i?"active":"",on:{click:function(s){return t.topMove(i,a._id)}}},[t._v(t._s(a.shortTitle))])})),0),s("div",{ref:"right",refInFor:!0,staticClass:"right fl",attrs:{value:t.i2}},[s("van-list",{staticClass:"popup-list",attrs:{finished:t.load.finished,"finished-text":t.load.loadingMsg,offset:50},on:{load:t.onLoad},model:{value:t.load.loading,callback:function(a){t.$set(t.load,"loading",a)},expression:"load.loading"}},t._l(t.rigDataArr,(function(a,i){return s("div",{key:i,staticClass:"item clearfix",on:{click:function(i){return t.SkipDetail(a._id)}}},[s("div",{staticClass:"img-box fl"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imgKey(a.cover),expression:"imgKey(it.cover)"}],staticClass:"auto-img",attrs:{alt:"图片未加载..."}})]),s("div",{staticClass:"text-box fl"},[s("div",{staticClass:"title"},[t._v(t._s(a.title))]),s("div",{staticClass:"name-box clearfix"},[s("div",{staticClass:"text"},[t._v(t._s(a.shortIntro))])]),s("div",{staticClass:"text-content"},[t._v(t._s(a.majorCate)+" : "+t._s(a.minorCate))])])])})),0)],1)])])})),1)],1)],1)},e=[],n=(i("fb6a"),i("a434"),i("2909")),o={data:function(){return{active:0,dataArr:[],top_index:0,rigDataArr:[],rigDataArrBooks:[],id1:[],id2:[],id3:[],index2:0,i2:0,i3:0,i:0,showLoading:!1,loadCount:10,load:{loading:!0,finished:!1,loadingMsg:"数据加载完毕..."}}},methods:{getData:function(){var t=this;this.showLoading=!0,this.axios.get("http://novel.kele8.cn/rank-category").then((function(a){t.showLoading=!1,t.dataArr.push({data:a.data.male,name:"男生"}),t.dataArr.push({data:a.data.female,name:"女生"}),t.dataArr.push({data:a.data.picture,name:"漫画"}),t.getXq(t.dataArr[0].data[0]._id),t.id1.push(t.dataArr[0].data[0]._id),t.id2.push(t.dataArr[1].data[0]._id),t.id3.push(t.dataArr[2].data[0]._id)})).catch((function(a){t.showLoading=!1}))},getXq:function(t){var a=this;this.axios.get("http://novel.kele8.cn/rank/"+t).then((function(t){200==t.status&&(a.rigDataArrBooks=t.data.ranking.books,a.rigDataArr=a.rigDataArrBooks.splice(0,a.loadCount),a.rigDataArrBooks.length>0?a.load.loading=!1:(a.load.loading=!0,a.load.finished=!0))})).catch((function(t){}))},topMove:function(t,a){this.top_index=t,this.getXq(a),this.i2==this.index2&&(this.$refs.right[this.i2].scrollTop=0)},onLoad:function(){var t=this;setTimeout((function(){var a;(a=t.rigDataArr).push.apply(a,Object(n["a"])(t.rigDataArrBooks.splice(0,t.loadCount))),t.load.loading=!1,0==t.rigDataArrBooks.length&&(t.load.loading=!0,t.load.finished=!0)}),1e3)},TabsMove:function(t){this.active=t,this.i2=this.active,this.i3=this.active,this.index2=this.active,0==this.active?this.getXq(this.id1[0]):1==this.active?this.getXq(this.id2[0]):2==this.active&&this.getXq(this.id3[0])},SkipDetail:function(t){this.$router.push({name:"Detail",query:{id:t}})},goUpLeve:function(){this.$router.go(-1)},imgKey:function(t){return unescape(t).slice(7)}},created:function(){this.getData()}},r=o,d=(i("b491"),i("2877")),l=Object(d["a"])(r,s,e,!1,null,"58a5bb30",null);a["default"]=l.exports},7310:function(t,a,i){},b491:function(t,a,i){"use strict";var s=i("7310"),e=i.n(s);e.a}}]);
//# sourceMappingURL=chunk-b914be4c.ba38aeb1.js.map