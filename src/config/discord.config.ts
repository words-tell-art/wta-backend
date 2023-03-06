import 'dotenv/config'

const discordConfig = {
    DISCORD_USERNAME: process.env.DISCORD_USERNAME!,
    DISCORD_PASSWORD: process.env.DISCORD_PASSWORD!,
    DISCORD_USER_DATA_DIR: process.env.DISCORD_USER_DATA_DIR!
};

export default discordConfig