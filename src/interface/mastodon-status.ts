export interface MastodonStatus {
    id: string
    content: string
    url: string
    account: {
        avatar_static: string
        display_name: string
        acct: string
        url: string
    }
    created_at: string
}
