app-app
    h1 LTL文脈わかるマン
    p LTLで会話してるインスタンス向け
    p 投稿URL
        input(type="text",placeholder="https://mastodon.social/@Gargron/1",style={"width": "100%"},ref="text")
    button(type="submit",onclick="{get}") 取得！
    #timeline
        app-post(post="{post}",each="{post in posts}")
    script.
        import "./post.tag"
        this.get = () => {
            var url = new URL(this.refs.text.value)
            console.log(url)
            var api = url.origin + "/api/v1/timelines/public"
            var query = {
                local: 1,
                max_id: parseInt(url.pathname.split("/").slice(-1)[0])+1
            }
            query = Object.keys(query).map(name => {
                return name + "=" + encodeURIComponent(query[name])
            }).join("&")
            fetch(api+"?"+query).then(res => res.json()).then(res => {
                this.posts = res
                this.update()
            })
        }