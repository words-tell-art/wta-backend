enum Endpoint {
    LOG_List = "/logs",
    LOG_Get = "/logs/:logId",
    WORD_Create = "/words",
    WORD_Update = "/words",
    WORD_Get = "/words/:id",
    WORD_List = "/words",
    ART_Create = "/arts",
    ART_Update = "/arts",
    ART_Get = "/arts/:id",
    ART_List = "/arts",
    ART_IsProcessing = "/art/is-processing",
    ART_GENEALOGY_Get = "/art/genealogy/:nftId",
    ART_REQUEST_List = "/art/requests",
    ART_REQUEST_Process = "/art/requests/:id/process",
    ART_REQUEST_Reset = "/art/requests/:id/reset",
    CHAIN_EVENT_List = "/chain-events",
    CHAIN_EVENT_SyncArtRequest = "/chain-events/sync-art-requests"
}

export default Endpoint