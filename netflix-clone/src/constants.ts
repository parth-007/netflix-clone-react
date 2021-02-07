import { Options } from "react-youtube";

export const BASE_PATH = "https://image.tmdb.org/t/p/original";

export const youtubePlayerOptions:Options = {
    height: "390",
    width: "100%",
    playerVars: {
        autoplay: 1,
    }
}