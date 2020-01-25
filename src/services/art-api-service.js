// import TokenService from '../services/token-service';
import config from '../config';

const ArtApiService = {
    getArtGallery() {
        return fetch(`${config.API_ENDPOINT}/art`, {
        //   headers: {
        //     'authorization': `bearer ${TokenService.getAuthToken()}`,
        //   },
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
      },
}
export default ArtApiService