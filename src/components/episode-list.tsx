import React from 'react';
import ReactDOM from 'react-dom';
import videojs from 'video.js';

export const EpisodeList: React.FC<{body: any; vjsComponent: any}> = ({body}) => {
    return (<div>
        <h1 onClick={() => console.log('click click')}>{body}</h1>
    </div>)
}




const vjsComponent = videojs.getComponent('Component');

class vjsEpisodeList extends vjsComponent {

    constructor(player: any, options: any) {
        super(player, options);

        /* Bind the current class context to the mount method */
        this.mount = this.mount.bind(this);

        /* When player is ready, call method to mount React component */
        player.ready(() => {
            this.mount();
        });

        /* Remove React root when component is destroyed */
        this.on("dispose", () => {
            ReactDOM.unmountComponentAtNode(this.el())
        });
    }

    mount() {
        ReactDOM.render(<EpisodeList vjsComponent={this} body="Episodes" />, this.el() );
    }
}

export default vjsEpisodeList;