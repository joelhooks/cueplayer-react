import {NextApiRequest, NextApiResponse} from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.statusCode = 200
    res.send(`WEBVTT

note
00:00:02.000 --> 00:00:05.000
{
"title": "Multi-celled organisms",
"description": "Multi-celled organisms have different types of cells that perform specialized functions.",
"src": "multiCell.jpg",
"href": "http://en.wikipedia.org/wiki/Multicellular"
}

note
00:00:17.000 --> 00:00:19.000
{
"title": "Note",
"description": "Curly Braces go in childresn"
}

`)
}
