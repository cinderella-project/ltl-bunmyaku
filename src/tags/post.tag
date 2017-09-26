app-post
    hr
    .container
        img.icon(src="{opts.post.account.avatar_static}")
        div {opts.post.account.display_name}
            span  @{opts.post.account.acct}
        div(ref="content")
        a.toot-link(href="{opts.post.url}") {opts.post.url}
    script.
        this.on("update", () => {
            this.refs.content.innerHTML = this.opts.post.content
        })
        this.on("mount", () => {
            console.log(this.opts.post)
            this.update()
        })
    style.
        .icon {
            width:2em;
            height:2em;
            float:left;
            margin-left: -3em;
        }
        .container {
            padding-left: 4em;
        }
        .toot-link {
            opacity: 0.5;
            color: black;
            font-size: 72%; /* くっ */
        }