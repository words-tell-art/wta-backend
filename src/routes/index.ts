import logRoute from "./log.route"
import artRoute from "./art.route"
import wordRoute from "./word.route"
import artRequestRoute from "./art-request.route"
import chainEventRoute from "./chain-event.route"

const routers = [
    logRoute,
    wordRoute,
    artRoute,
    artRequestRoute,
    chainEventRoute
]

export default routers