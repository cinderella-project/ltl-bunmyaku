import { MastodonStatus } from "../interface/mastodon-status"
import { ListGroupItem, Media } from "reactstrap"
import React from "react"
import { format } from "date-fns/esm"

export function Status({ status }: { status: MastodonStatus }) {
    return (
        <ListGroupItem>
            <Media>
                <Media left href={status.account.url}>
                    <Media
                        object
                        src={status.account.avatar_static}
                        style={{ width: 64 }}
                    />
                </Media>
                <Media body className="ml-4">
                    <Media heading>
                        {status.account.display_name} (@{status.account.acct})
                    </Media>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: status.content,
                        }}
                    />
                    <a href={status.url}>
                        <time>
                            {format(
                                new Date(status.created_at),
                                "yyyy/MM/dd HH:mm:SS"
                            )}
                        </time>
                    </a>
                </Media>
            </Media>
        </ListGroupItem>
    )
}
