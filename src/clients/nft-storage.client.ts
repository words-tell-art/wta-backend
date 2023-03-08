import nftConfig from "../config/nft.config"
import {NFTStorage} from "nft.storage"

export default new NFTStorage({ token: nftConfig.STORAGE_API_KEY })