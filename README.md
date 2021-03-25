# Cue Player React

exploring a player that uses the `video` element and has a focus on the idea of cue points throughout the timeline of the video

[PDF Exploring UX](https://share.getcloudapp.com/6qu8OwwB)

## References

https://github.com/video-react/video-react
https://github.com/video-dev/hls.js/blob/master/docs/API.md
https://github.com/delphiki/Playr/blob/master/playr.js

### Cue Points as Data

[WebVTT is a specification](https://w3c.github.io/webvtt/) for describing captions, subtitles, metadata, and chapter cues

https://player.support.brightcove.com/general/implementing-cue-points-programmatically.html
https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API
https://webplatform.github.io/docs/concepts/VTT_Captioning/

[Live WebVTT Validator](https://quuz.org/webvtt/)

**metadata**

This type of cue is interesting because it can represent arbitrary JSON data structures. We can **build vtt from data sources** and have a standard approach for integrating with the player in a web standard fashion.

```text
WEBVTT - Example metadata track containing JSON payload

multiCell
00:01:15.200 --> 00:02:18.800
{
"title": "Multi-celled organisms",
"description": "Multi-celled organisms have different types of cells that perform specialised functions.
  Most life that can be seen with the naked eye is multi-cellular. These organisms are though to have evolved around 1 billion years ago with plants, animals and fungi having independent evolutionary paths.",
"src": "multiCell.jpg",
"href": "http://en.wikipedia.org/wiki/Multicellular"
}

insects
00:02:18.800 --> 00:03:01.600
{
"title": "Insects",
"description": "Insects are the most diverse group of animals on the planet with estimates for the total
  number of current species range from two million to 50 million. The first insects appeared around
  400 million years ago, identifiable by a hard exoskeleton, three-part body, six legs, compound eyes
  and antennae.",
"src": "insects.jpg",
"href": "http://en.wikipedia.org/wiki/Insects"
}
```

```js
textTrack.oncuechange = function (){
  // "this" is a textTrack
  var cue = this.activeCues[0]; // assuming there is only one active cue
  var obj = JSON.parse(cue.text);
  // do something
}
```
