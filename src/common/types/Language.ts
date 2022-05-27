/**
 * Data object for a language
 */
export interface Language {
    /**
     * The name of the language
     */
    language: string;
    /**
     * The number of lines of this language in the repo
     */
    lines: number;
}