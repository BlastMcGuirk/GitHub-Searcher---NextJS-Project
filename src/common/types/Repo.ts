/**
 * Data object for basic information about a repo
 */
export interface Repo {
    /**
     * The full name of the repo (/[user]/[name])
     */
    fullName: string;
    /**
     * The name of the repo
     */
    name: string;
    /**
     * The user for the repo
     */
    user: string;
    /**
     * The description of the repo
     */
    description: string;
    /**
     * The url to the repo on github
     */
    url: string;
    /**
     * The main language of the repo
     */
    language: string;
    /**
     * The number of stars on the repo
     */
    stars: number;
    /**
     * Whether or not the repo is private or public
     * Note: I realized later that making public API calls
     *  will only get you public repos... but I kept it
     *  in here anyways :)
     */
    isPrivate: boolean;
    /**
     * Links to various resources for the repo
     */
    links?: RepoLinks
}

/**
 * Data object for links for more info on the repo
 */
export interface RepoLinks {
    /**
     * Url to get all the languages for the repo
     */
    languagesUrl: string;
    /**
     * Url to get all the contributers for the repo
     */
    contributersUrl: string;
    /**
     * Url to get the README for the repo if it exists
     */
    readmeUrl: string;
    /**
     * Url to get all the commits for the repo
     */
    commitsUrl: string;
}