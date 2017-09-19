/**
 * Created by chao on 2017/9/13.
 */
import React, {Component} from 'react';
import styled from 'styled-components';
import HttpRequest from '../utils/HttpRequest';

const Box = styled.div`
  height: ${(props) => props.h / 100}rem;
`;

export default class PlayGameContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            err: false,
            roomId: null
        };
    }

    render() {
        let height = document.getElementsByTagName('html')[0].clientHeight;
        console.log(height);
        return (
            <Box id='playGameBox' h={height}/>
        );
    }

    componentDidMount() {
        this.getRoomId()
        window.Cloudplay.initSDK({
            accessKeyID: 'D4F92FE4CFC',
            accesskey: '625a706566676a397432573238557444',
            channelId: 100001,
            pkg_name: 'com.migu.game.ddzzr',
            onSceneChanged: function (sceneId, extraInfo) {
                console.log('sceneId & extraInfo', sceneId, extraInfo);
            },

            MessageHandler: function (message) {
                console.log(message);
            }
        });
        let gameOptions = {
            appid: 123,
            userinfo: {
                uId: '1234',
                utoken: '12345678'
            },
            priority: 0,
            extraId: 'miguh5',
            pkg_name: 'com.migu.game.ddzzr',
            playingtime: 600000,
            configinfo: 'miguh5',
            c_token: 'abcd',
            isPortrait: false
        };
        window.Cloudplay.startSDK(gameOptions);
    }

    componentWillUnmount() {
        window.location.reload();
        window.Cloudplay.stopSDK();
    }

    /**
     * 获取房间号,只针对咪咕棋牌游戏有效
     * atob
     */
    getRoomId() {
        HttpRequest.getRoomId({}, (res) => {
            console.log(res);
            console.log('++++++++++++roomId:  ' + res.resultData.battleCode)
            this.setState({
                roomId: window.btoa(res.resultData.battleCode)
            });
        }, (err) => {
            this.setState({
                roomId: null
            });
        });
    }
};

