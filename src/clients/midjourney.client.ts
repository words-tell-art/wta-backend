import {MidjourneyPuppet, options} from "@d-lab/discord-puppet"
import discordConfig from "../config/discord.config"

export default new MidjourneyPuppet(options(
    discordConfig.DISCORD_USERNAME,
    discordConfig.DISCORD_PASSWORD,
    discordConfig.DISCORD_USER_DATA_DIR
))