import FullscreenApi from "./fullscreen-api";
import videojs from "video.js";
const vjsButton = videojs.getComponent('Button');

class EHFullscreenToggle extends vjsButton
{
    fullscreenApi

    constructor(player, options)
    {
        super(player, options);
        console.log(options)
        this.fullscreenApi = new FullscreenApi(options.fullscreenElement || options.playerOptions?.fullscreenElement);
        this.fullscreenApi.addEventListener
        (
            'fullscreenchange',
            () =>
            {
                if (this.fullscreenApi.isFullscreen)
                {
                    // noinspection JSUnresolvedFunction
                    this.controlText('Non-Fullscreen');
                    player.isFullscreen(true);
                }
                else
                {
                    // noinspection JSUnresolvedFunction
                    this.controlText('Fullscreen');
                    player.isFullscreen(false);
                }
            }
        );
        if (!this.fullscreenApi.fullscreenEnabled)
        {
            this.disable();
        }
        this.on
        (
            'unmute',
            event =>
            {
                if(this.fullscreenApi.isFullscreen)
                {
                    event.stopPropagation();
                }
            }
        );
    }
    // noinspection JSUnusedGlobalSymbols
    buildCSSClass()
    {
        // noinspection JSUnresolvedFunction
        return `vjs-fullscreen-control ${super.buildCSSClass()}`;
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    handleClick()
    {
        if (this.fullscreenApi.isFullscreen)
        {
            this.fullscreenApi.exitFullscreen();
        }
        else
        {
            this.fullscreenApi.requestFullscreen();
        }
    }
}


export default EHFullscreenToggle;