import React from 'react';
import GeoinnsynRepository from '../repositories/GeoinnsynRepository';

class SamxAdministration extends React.Component {
    constructor(){
        super();
    }

    renderConfig = () => {
        let config = GeoinnsynRepository.getConfig();
        return (
            <pre style={{
                backgroundColor: 'rgb(200,200,200)',
                height: '100%',
                overflow: 'auto',
                // margin: 20,
                padding: 10
            }}>
                {JSON.stringify(config, null, 2)}
            </pre>
        );
    }

    render = () => {
        return (
            <div style={{
                backgroundColor: 'rgb(255,255,255)',
                height: window.innerHeight - 20,
                overflow: 'hidden',
                padding: 10
            }}>
                {this.renderConfig()}
            </div>
        );
    }
}

export default SamxAdministration;