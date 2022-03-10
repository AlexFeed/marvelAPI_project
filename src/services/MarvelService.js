class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey= '&apikey=94cd8f145a0551e6b7ef67f3edad94c9';
    _baseOffset = 200;

    getResource = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Couldn't get resource'${url}, status ${response.status}`);
        } else {
            return response.json();
        }
    }

    getCharactersList = async (offset = this._baseOffset) => {
        const charactersList =  await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}${this._apiKey}`);

        return charactersList.data.results.map(this._transformCharacterInfo);
    }

    getCharacterInfo = async (id) => {
        const characterInfo = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

        return this._transformCharacterInfo(characterInfo.data.results[0]);
    }

    _transformCharacterInfo = (characterInfo) => {
        return {
            id: characterInfo.id,
            name: characterInfo.name.length > 50 ? `${characterInfo.name.slice(0, 50)}...` : characterInfo.name,
            description: characterInfo.description ? `${characterInfo.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: characterInfo.thumbnail.path + '.' + characterInfo.thumbnail.extension,
            homepage: characterInfo.urls[0].url,
            wiki: characterInfo.urls[1].url,
            comics: characterInfo.comics.items
        }
    }
}

export default MarvelService;