
    let getFromApi = (input) => {
        const url = "https://swapi.co/api";
        if(!input) return;
        let newurl = `${url}/${input}`;
        return new Promise((success, reject) => {
            $.get(newurl, (res) => {
                success(res);
            }).fail((err) => {
                reject(err);
            });
        });
    };

    let getByRawURL = (input) => {
        if(!input) return;
        let newurl = `${input}`;
        return new Promise((success, reject) => {
            $.get(newurl, (res) => {
                success(res);
            }).fail((err) => {
                reject(err);
            });
        });
    };


    export default {
        request: getFromApi,
        raw: getByRawURL
    };


