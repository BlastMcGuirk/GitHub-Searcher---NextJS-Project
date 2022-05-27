import React, { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import RepoCard from '../common/components/RepoCard/RepoCard'
import { Repo } from '../common/types/Repo'
import { fetchRepos } from '../common/utils/githubFetch'
import { LoadingSpinner } from '../common/components/LoadingSpinner/LoadingSpinner'

/**
 * Page for searching for a name in github and displaying all that
 * users repos, sorted by star count
 * @returns Page with search function and repo list
 */
const Home: NextPage = () => {

  // Use the router for putting the username in the query
  const router = useRouter();

  // Get a reference to the input text
  const inputRef = useRef<HTMLInputElement>(null);

  // State for whether or not the data is loading
  const [loading, setLoading] = useState(false);

  // State for when the username searched is invalid
  const [userInvalid, setUserInvalid] = useState(false);

  // State for the repo details
  const [repos, setRepos] = useState<Repo[]>([]);

  // When the query changes, load new repos
  useEffect(() => {

    // Get the username from the query
    const username = router.query.u as string;

    if (username && inputRef.current) {

      // Fill in the search text box (necessary in the case of refreshing a page)
      inputRef.current.value = username;

      // Search for repos
      searchForRepos(username);

    }
  }, [router.query.u]);

  // Set the url query to the text in the search box
  function setQueryValue() {

    // Get the username from the text box
    let username = inputRef.current?.value;
    if (!username) return;

    // Only update the query if the username changed
    if (username !== router.query.u) {
      // Set the query values
      router.query.u = username;
      router.push({
        pathname: '/',
        query: { ...router.query, u: username }
      });
    } else {
      // If the username stayed the same, just refresh the search
      searchForRepos(username);
    }
  }

  /**
   * Helper function to search for repos belonging to a user
   * @param username The user to search for
   */
  function searchForRepos(username: string) {

    // Start the loading spinner
    setLoading(true);

    // Make the API call
    fetchRepos(username)
      .then(repos => {
        // Repos loaded
        setRepos(repos);
        setUserInvalid(false);
        setLoading(false);
      })
      .catch(error => {
        // Username is invalid
        setUserInvalid(true);
        setLoading(false);
      })
  }

  // If there is a search query, append it to the title
  const pageTitle = "GitHub Searcher" + (router.query.u ? " - " + router.query.u : "");

  return (
    <div className={styles.container}>

      {/* Metadata for the page */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Search for a user on github and see info about their repos" />
        <link rel="icon" href="../images/favicon.ico" />
      </Head>

      <main className={styles.main}>

        {/* The title of the page */}
        <h1 className={styles.title}>
          GitHub Searcher
        </h1>

        <div className={styles.searchArea}>

          {/* The search input text */}
          <input 
            className={styles.searchBar}
            ref={inputRef}
            onKeyDown={(e) => {
              // Let the user search with the enter key
              if (e.key === 'Enter') setQueryValue()
            }} />

          {/* The search button */}
          <button
            className={styles.searchButton}
            onClick={setQueryValue}
          >
            Search
          </button>

        </div>

        {/* If the page is loading, display a loading spinner */}
        {loading && (<LoadingSpinner />)}

        {/* If the page isn't loading but the username is invalid, let the user know */}
        {!loading && userInvalid && (<div className={styles.invalidUser}>Invalid User</div>)}

        {/* If the page is done loading and the username is valid, display the repos */}
        {!loading && !userInvalid && (<div className={styles.grid}>

          {/* Map each repo to a RepoCard */}
          {repos.map(repo => <RepoCard key={repo.fullName} repo={repo} />)}

        </div>)}

      </main>

    </div>
  )
}

export default Home
