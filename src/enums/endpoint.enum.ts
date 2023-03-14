enum Endpoint {
    LOG_List = "/logs",
    LOG_Get = "/logs/:logId",
    WORD_Create = "/words",
    METADATA_ART_Get = "/metadata/art/:id",
    METADATA_WORD_Get = "/metadata/word/:id",
}

export default Endpoint