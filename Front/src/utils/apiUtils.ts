const { host } = window.location

function RemovePort(host:string)
{
    if (host.includes(":"))
    {
        return host.split(":")[0];
    }
    return host;
}

const APIURL = `http://${RemovePort(host)}:8888/api`;
/**
 * Génère une adresse d'API
 * @param path Chemin dans l'API exemple : /usager
 * @returns 
 */
export function GenerateAPIURL(path:string)
{
    return APIURL + path;
}
