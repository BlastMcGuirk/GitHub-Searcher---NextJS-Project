import { Contributer } from "./Contributer";

/**
 * Data object for a commit
 */
export interface Commit {
    /**
     * The committer
     */
    user: Contributer,
    /**
     * The date of the commit
     */
    date: string,
    /**
     * The commit message
     */
    message: string,
    /**
     * The url to the commit on github
     */
    url: string
}