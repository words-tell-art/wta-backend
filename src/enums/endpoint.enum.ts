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
    ART_GENEALOGY_Get = "/art/genealogy/:nftId",
}

export default Endpoint