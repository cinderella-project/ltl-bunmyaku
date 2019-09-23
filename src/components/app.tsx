import * as React from "react"
import {
    FormGroup,
    Label,
    Input,
    Jumbotron,
    Button,
    ListGroup,
    ListGroupItem,
    Media,
} from "reactstrap"
import { useState } from "react"
import axios from "axios"
import { format } from "date-fns"
import { MastodonStatus } from "../interface/mastodon-status"
import { Status } from "./status"

export function App() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [statuses, setStatuses] = useState<MastodonStatus[]>([])

    const regexResult = /https:\/\/(.+?)\/(?:@[a-zA-Z0-9_]+|users\/[a-zA-Z0-9_]+\/statuses)\/(\d+)/.exec(
        url
    )

    console.log(regexResult)

    async function load() {
        if (regexResult == null) return
        setLoading(true)
        const [, host, postId] = regexResult
        const res = await axios.get<MastodonStatus[]>(
            `https://${host}/api/v1/timelines/public`,
            {
                params: {
                    local: 1,
                    max_id: postId,
                },
            }
        )
        setStatuses(res.data)
        setLoading(false)
    }

    return (
        <div className="container mt-4">
            <Jumbotron>
                <h1>LTL文脈わかるマン</h1>
                <p>LTLで会話してるインスタンス向け</p>
            </Jumbotron>
            <FormGroup>
                <Label>投稿URL</Label>
                <Input
                    type="url"
                    placeholder="https://mastodon.social/@Gargron/1"
                    disabled={loading}
                    onChange={e => setUrl(e.target.value)}
                />
            </FormGroup>
            <Button
                disabled={loading || regexResult == null}
                color="primary"
                onClick={load}
            >
                取得!
            </Button>
            <hr />
            <ListGroup>
                {statuses.map(s => (
                    <Status status={s} key={s.id} />
                ))}
            </ListGroup>
            <hr />
            <p>
                <a href="https://github.com/cinderella-project/ltl-bunmyaku">
                    GitHub
                </a>
            </p>
        </div>
    )
}
