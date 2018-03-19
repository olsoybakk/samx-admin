import {extendObservable, computed} from 'mobx';
import axios from 'axios';
import GeoinnsynConfig from '../geoinnsyn';

class GeoinnsynRepository{
    constructor(){
        extendObservable(this, {
            config: GeoinnsynConfig
        });

        let self = this;

        setTimeout(() => {
            console.log(self.config);
        }, 0);
    }

    initialize = () => {
        let self = this;
        let samxurl = 'http://www.sam-x.no/Map/GetProject';
        axios.get(samxurl, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then(res => {
            const posts = res.data.data.children.map(obj => obj.data);
            this.setState({ posts });
        });
    }

    initialize1 = () => {
        let self = this;
        let samxurl = '../';
        fetch(samxurl, {
            mode: 'no-cors', // no-cors, cors, *same-origin
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
        // .then(response => self.validateResultAndReturnEmptyJson(response))
        .then((response) => {
            console.log(response.json());

        })
        .then(response => response.json())
        .then((result) =>{
            console.log(result);
            self.config = result;
        });
    }

    getConfig = () => {
        return this.config;
    }

    validateResultAndReturnFunction = (response, func) => {
        this.showprogress = false;
        if (!response.ok){
            // Unauthorized
            switch (response.status){
                case 401:
                    this.isAuthorized = false;
                    break;
                case 417:
                    let self = this;
                    let checkError = (result) => {
                        if (result.Message){
                            self.errorText = result.Message;
                            setTimeout(() => {
                                self.errorText = '';
                            }, 100);
                        }
                    }
                    response.json()
                    .then(result => checkError(result));
                    break;
                default:
                    // console.log(response.status);
            }
            response.json = func;
        }
        return response;
    }
    
    validateResultAndReturnEmptyJson = (response) => {
        var returnFunction = () => {return {};};
        return this.validateResultAndReturnFunction(response, returnFunction);
    }

    validateResultAndReturnEmptyJsonArray = (response, hasQueue) => {
        if (hasQueue) this.fetchQueue--;
        var returnFunction = () => {return [];};
        return this.validateResultAndReturnFunction(response, returnFunction);
    }
}

export default new GeoinnsynRepository();