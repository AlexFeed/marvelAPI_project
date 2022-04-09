import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey= '&apikey=94cd8f145a0551e6b7ef67f3edad94c9';
    const _baseOffset = 210;

    const _transformCharacterInfo = (characterInfo) => {
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

    const getCharactersList = async (offset = _baseOffset) => {
        const charactersList =  await request(`${_apiBase}characters?limit=9&offset=${offset}${_apiKey}`);

        return charactersList.data.results.map(_transformCharacterInfo);
    }

   const getCharacterInfo = async (id) => {
        const characterInfo = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return _transformCharacterInfo(characterInfo.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacterInfo);
    }

    const _transformComicInfo = (comicInfo) => {
        return {
            id: comicInfo.id,
            title: comicInfo.title,
            description: comicInfo.description || "There is no description",
            pageCount: comicInfo.pageCount || "There is no information about the number of pages",
            language: comicInfo.textObjects.length > 0 ? comicInfo.textObjects[0].language : 'en-us',
            price: comicInfo.prices[0].price || "Not available",
            thumbnail: comicInfo.thumbnail.path + '.' + comicInfo.thumbnail.extension
        }
    }

    const getComicsList = async (offset = _baseOffset) => {
        const comicsList = await request(`${_apiBase}comics?limit=8&offset=${offset}${_apiKey}`);

        return comicsList.data.results.map(_transformComicInfo);
    }

    const getComicInfo = async (id) => {
        const comicInfo = await request(`${_apiBase}comics/${id}?${_apiKey}`);

        return  _transformComicInfo(comicInfo.data.results[0]);
    }

    return {loading, error, getCharactersList, getCharacterInfo, getComicsList, getComicInfo, getCharacterByName, clearError}
}

export default useMarvelService;