<!-- 文章评论列表 -->
<template>
 <div class="comment-list">
    <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="list ? '已展示所有评论': '暂无评论'"
        @load="onLoad"
    >
        <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.content" /> -->
        <comment-item
             v-for="(comment, index) in list"
            :key="index"
            :comment="comment"
            @reply-click="$emit('reply-click', $event)"
        />
    </van-list>
 </div>
</template>

<script>
import { getArticleComments } from '@/api/comment'
import commentItem from './comment-item'
// import request from '@/utils/request'

export default {
 name: 'commentList',
 components: {
     commentItem
 },
 props: {
     source: {
         type: [String, Number, Object],
         required: true
     },
     list: {
         type: Array,
         required: true
     }
 },
 data () {
  return {
    //   list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
  }
 },
 computed: {},
 watch: {},
 created() {},
 mounted() {},
 methods: {
      async onLoad () {
        //   1.请求获取数据
        const { aaa } = await getArticleComments()

        // const aaaa = await request.get({
        //         url: '/app/v1_0/comments',
        //         params: {
        //             type: 'a',
        //             source: this.source,
        //             offset: this.offset,
        //             limit: this.limit
        //         }
        // })
        // console.log(aaaa)
        console.log('aaa')
        console.log(aaa)

        const data = {
            message: 'OK',
            data: {
                total_count: 8,
                end_id: 1604480486,
                last_id: 1604480486,
                results: [
                    {
                        com_id: 1323936197352882176,
                        aut_id: 1,
                        pubdate: '2020-11-04T18:32:41',
                        content: 'xxxx',
                        is_top: 0,
                        aut_name: '有点666',
                        aut_photo: 'http://toutiao-img.itheima.net/Ftb-E6bXjx1HlnJHPhe5N6E_seaI',
                        like_count: 0,
                        reply_count: 0,
                        is_liking: false
                    },
                    {
                        com_id: 1323921967442558976,
                        aut_id: 1,
                        pubdate: '2020-11-04T17:36:08',
                        content: '2131142',
                        is_top: 0,
                        aut_name: '有点666',
                        aut_photo: 'http://toutiao-img.itheima.net/Ftb-E6bXjx1HlnJHPhe5N6E_seaI',
                        like_count: 0,
                        reply_count: 0,
                        is_liking: false
                    },
                    {
                        com_id: 1323921075305709568,
                        aut_id: 1,
                        pubdate: '2020-11-04T17:32:36',
                        content: '1233333',
                        is_top: 0,
                        aut_name: '有点666',
                        aut_photo: 'http://toutiao-img.itheima.net/Ftb-E6bXjx1HlnJHPhe5N6E_seaI',
                        like_count: 0,
                        reply_count: 0,
                        is_liking: false
                    },
                    {
                        com_id: 1323921049259081728,
                        aut_id: 1,
                        pubdate: '2020-11-04T17:32:30',
                        content: 'ss',
                        is_top: 0,
                        aut_name: '有点666',
                        aut_photo: 'http://toutiao-img.itheima.net/Ftb-E6bXjx1HlnJHPhe5N6E_seaI',
                        like_count: 0,
                        reply_count: 0,
                        is_liking: false
                    },
                    {
                        com_id: 1323919633434017792,
                        aut_id: 1,
                        pubdate: '2020-11-04T17:26:52',
                        content: 'dsadasd',
                        is_top: 0,
                        aut_name: '有点666',
                        aut_photo: 'http://toutiao-img.itheima.net/Ftb-E6bXjx1HlnJHPhe5N6E_seaI',
                        like_count: 0,
                        reply_count: 0,
                        is_liking: false
                    },
                    {
                        com_id: 1323919591771996160,
                        aut_id: 1,
                        pubdate: '2020-11-04T17:26:42',
                        content: 'ddd',
                        is_top: 0,
                        aut_name: '有点666',
                        aut_photo: 'http://toutiao-img.itheima.net/Ftb-E6bXjx1HlnJHPhe5N6E_seaI',
                        like_count: 1,
                        reply_count: 0,
                        is_liking: false
                    },
                    {
                        com_id: 1323918614293643264,
                        aut_id: 1,
                        pubdate: '2020-11-04T17:22:49',
                        content: 'sdd',
                        is_top: 0,
                        aut_name: '有点666',
                        aut_photo: 'http://toutiao-img.itheima.net/Ftb-E6bXjx1HlnJHPhe5N6E_seaI',
                        like_count: 0,
                        reply_count: 0,
                        is_liking: false
                    },
                    {
                        com_id: 1323913234972934144,
                        aut_id: 1,
                        pubdate: '2020-11-04T17:01:26',
                        content: '222231',
                        is_top: 0,
                        aut_name: '有点666',
                        aut_photo: 'http://toutiao-img.itheima.net/Ftb-E6bXjx1HlnJHPhe5N6E_seaI',
                        like_count: 0,
                        reply_count: 0,
                        is_liking: false
                    }
                ]
            }
        }

        const { results } = data.data
        console.log(results)
        // 2.将数据放到列表中
        this.list.push(...results)

        this.$emit('update-total-count', data.data.total_count)

        // 3.将本次的loading关闭
        this.loading = false
        // 4.判断是否还有数据
        // if (results.length) {
        //     // 如果有，更新获取下一页数据的页码
        //     this.offset = data.data.last_id
        // } else {
        //     // 如果没有，则将finished设置为true，不再触发加载更多了
        //     this.finished = true
        // }

        this.finished = true
    }
 }
}
</script>
<style lang='scss' scoped>
</style>
