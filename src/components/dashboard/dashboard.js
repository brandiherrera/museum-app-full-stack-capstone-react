import React from 'react';
import ArtPage from '../art-page/art-page';

const artArray = [
    {
        objectID: 300,
        primaryImage: 'https://images.metmuseum.org/CRDImages/ad/original/69178.jpg',
        title: 'Balcony',
        objectDate: '1800-1830',
        artistDisplayName: '',
    },
    {
        objectID: 4000,
        primaryImage: 'https://images.metmuseum.org/CRDImages/ad/original/112937.jpg',
        title: 'Fragment',
        objectDate: '1700-1800',
        artistDisplayName: '',
    },
    {
        objectID: 436535,
        primaryImage: 'https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg',
        title: 'Wheat Field with Cypresses',
        objectDate: '1889',
        artistDisplayName: 'Vincent van Gogh',
    },
    {
        objectID: 438012,
        primaryImage: 'https://images.metmuseum.org/CRDImages/ep/original/DT1877.jpg',
        title: 'Bouquet of Chrysanthemums',
        objectDate: '1881',
        artistDisplayName: 'Auguste Renoir',
    },
]

const commentArray = [
    {
        objectID: 436535,
        user: 'Artlover3000',
        comment: 'This is my favorite!!!',
    },
    {
        objectID: 436535,
        user: 'vangogogh',
        comment: 'Starry Night, spectacular!'
    },
    {
        objectID: 438012,
        user: 'masterpeace',
        comment: 'Oh la laaaa',
    },
]

export default class Dashboard extends React.Component {
    state = {
        art: [],
        comments: [],
        picture: '',
        title: '',
        artist: '',
        year: '',
        error: null,
    }

    getRandomArtId() {
        const randomId = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
        console.log(randomId)
        return randomId;
    }

    componentDidMount() {
        let i = 2; // TODO ---> will be the objectID from function getRandomArtId()
        // ArtApiService.getTodaysArt()
        //     .then(resJson =>
                this.setState({
                        picture: artArray[i].primaryImage,
                        title: artArray[i].title,
                        artist: artArray[i].artistDisplayName,
                        year: artArray[i].objectDate,
                })
                // )
                console.log(this.state)
            // .catch(error => this.setState({error}))
        
    }

    render() {
        this.getRandomArtId()

        return (
            <div className='dashboard'>
                <h2>Today's feature:</h2>
                <ArtPage 
                    picture={this.state.picture}
                    title={this.state.title}
                    artist={this.state.artist}
                    year={this.state.year}
                />
            </div>

        )
    }
}