import {Client as MetadataClient} from "@d-lab/metadata"
import nftConfig from "../config/nft.config"
import ssoConfig from "../config/sso.config"

export default new MetadataClient(nftConfig.METADATA_URL, ssoConfig.SSO_API_KEY)