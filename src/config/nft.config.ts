import 'dotenv/config'

const nftConfig = {
    METADATA_URL: process.env.METADATA_URL!,
    collection: {
        WORD_ADDRESS: process.env.COLLECTION_WORD_ADDRESS!,
        ART_ADDRESS: process.env.COLLECTION_ART_ADDRESS!
    }
};

export default nftConfig