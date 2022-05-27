import { Repo } from "../types/Repo";

/**
 * Helper function to get all repos for a user
 * @param username The account name to look for
 * @returns The list of repos for the user
 */
export async function fetchRepos(username: string): Promise<Repo[]> {
    // The URL for the request
    let URL = 'https://api.github.com/users/' + username + '/repos';

    // Perform the fetch
    let res: any[] = await (await fetch(URL)).json();

    // Filter out all forked repos
    res = res.filter(repo => !repo.fork);

    // Sort by star count
    res = res.sort((repo1, repo2) => repo1.stargazers_count < repo2.stargazers_count ? 1 : -1)

    // Map the response to a Repo Data Object
    return res.map((repo): Repo => {
        return {
            fullName: repo.full_name,
            name: repo.name,
            user: repo.owner.login,
            description: repo.description,
            isPrivate: repo.private,
            url: repo.html_url,
            language: repo.language,
            stars: repo.stargazers_count
        }
    });
}

/**
 * Helper function to get the details of a single repo
 * @param user The account name
 * @param repo The repo name
 * @returns Major details about the repo plus links to get more info
 */
export async function fetchRepo(user: string, repo: string): Promise<Repo> {
    // The URL for the request
    let URL = 'https://api.github.com/repos/' + user + '/' + repo;

    // Perform the fetch
    let res: any = await (await fetch(URL)).json();
    
    // Map the response to a Repo Data Object
    return {
        fullName: res.full_name,
        name: res.name,
        user: res.owner.login,
        description: res.description,
        isPrivate: res.private,
        url: res.html_url,
        language: res.language,
        stars: res.stargazers_count,
        links: {
            languagesUrl: res.languages_url,
            contributersUrl: res.contributors_url.split('{')[0],
            readmeUrl: res.url + "/readme",
            commitsUrl: res.commits_url.split('{')[0]
        }
    }
}

/**
 * Helper method for rendering the README using github's Markdown Post API call
 * @param markdownText The encoded markdown text (base64)
 * @returns HTML version of the markdown
 */
export async function getMarkdownDisplay(markdownText: string) {
    // The URL for the request
    let URL = "https://api.github.com/markdown";

    // Decode the markdown
    let bodyText = window.atob(markdownText)
    // The first 3 characters of a github markdown file are non ASCII, 
    // so remove them.
        .substring(3);

    // Make the POST request to convert markdown to HTML
    return await (await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: bodyText
        })
    })).text();
}