import React, { PureComponent } from 'react';
import YouTube from 'react-native-youtube'

export default class BottomLogin extends PureComponent {

    render() {
        return (
            
            <YouTube
                apiKey='AIzaSyBf5HHH6Pyw2ZigXFt0mB1cbKrHoOKPH6k'
                videoId="yJNmvqRlz_E"
                play={false}
                fullscreen={false}
                loop={false}
                controls={2}
                resumePlayAndroid={false}
                style={{
                    alignSelf: 'stretch', height: 170, marginTop: 20,
                    width: '90%', marginLeft: 'auto', marginRight: 'auto',
                }} />
        );
    }
}
