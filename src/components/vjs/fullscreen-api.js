const key =
    {
        fullscreenEnabled: 0,
        fullscreenElement: 1,
        requestFullscreen: 2,
        exitFullscreen: 3,
        fullscreenchange: 4,
        fullscreenerror: 5,
    };
const webkit =
    [
        'webkitFullscreenEnabled',
        'webkitFullscreenElement',
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitfullscreenchange',
        'webkitfullscreenerror',
    ];
const moz =
    [
        'mozFullScreenEnabled',
        'mozFullScreenElement',
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozfullscreenchange',
        'mozfullscreenerror',
    ];
const ms =
    [
        'msFullscreenEnabled',
        'msFullscreenElement',
        'msRequestFullscreen',
        'msExitFullscreen',
        'MSFullscreenChange',
        'MSFullscreenError',
    ];
const vendor =
    typeof document !== 'undefined' && (
        ('fullscreenEnabled' in document && Object.keys(key)) ||
        (webkit[0] in document && webkit) ||
        (moz[0] in document && moz) ||
        (ms[0] in document && ms) ||
        []
    );
const map = new WeakMap;

export default class FullscreenApi
{
    constructor(element)
    {
        map.set(this,element);
    }
    requestFullscreen()
    {
        if(this.isFullscreen)
        {
            return Promise.resolve();
        }
        const element = map.get(this);
        const fullscreenResult = element[vendor[key.requestFullscreen]]();
        if(fullscreenResult && fullscreenResult.then)
        {
            fullscreenResult.then
            (
                () => element.ownerDocument.defaultView.screen.orientation.lock('landscape')
            )
                .catch( () => {} );
        }
        return fullscreenResult;
    }
    exitFullscreen()
    {
        if(this.isFullscreen)
            return map.get(this).ownerDocument[vendor[key.exitFullscreen]]();
    }
    addEventListener(type, handler, options)
    {
        console.log(map.get(this))
        return map.get(this).ownerDocument.addEventListener(vendor[key[type]], handler, options);
    }
    removeEventListener(type, handler, options)
    {
        return map.get(this).ownerDocument.removeEventListener(vendor[key[type]], handler, options);
    }
    get fullscreenEnabled()
    {
        return Boolean(map.get(this).ownerDocument[vendor[key.fullscreenEnabled]]);
    }
    get isFullscreen()
    {
        const element = map.get(this);
        return element.ownerDocument[vendor[key.fullscreenElement]] === element;
    }
};