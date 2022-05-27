import React, { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../../../styles/RepoPage.module.css'
import { Repo } from '../../common/types/Repo'
import { fetchRepo, getMarkdownDisplay } from '../../common/utils/githubFetch'
import { Language } from '../../common/types/Language'
import { Contributer } from '../../common/types/Contributer'
import { Commit } from '../../common/types/Commit'
import { RepoInfoPanel } from '../../common/components/Panel/RepoInfoPanel'
import { READMEPanel } from '../../common/components/Panel/READMEPanel'
import { CommitsPanel } from '../../common/components/Panel/CommitsPanel'
import { Tabs } from '../../common/components/tabs/Tabs'

/**
 * Props for the Repo page
 */
interface RepoPageProps {
  /**
   * Information about the repo being shown
   */
  repo: Repo;
}

/**
 * A status for something that is loading
 */
export type LoadingStatus = 'Pending' | 'Failed' | 'Success';

/**
 * Page for displaying details of a repo
 * Details include:
 *  General info (publicity, star count, description)
 *  Languages used in repo with line count
 *  Contributers with links
 *  Repo README
 *  Repo Commits
 * @param props Props for the repo page
 * @returns A page displaying advanced info about a repo
 */
const RepoPage: NextPage<RepoPageProps> = (props: RepoPageProps) => {

  // Extract the props
  const { repo } = props;

  // State for which tab is currently selected and displayed
  const [selectedTab, setSelectedTab] = useState(0);

  // State for the languages used in a repo
  const [languages, setLanguages] = useState<Language[]>([]);
  // State for the status of loading the languages
  const [languagesStatus, setLanguagesStatus] = useState<LoadingStatus>('Pending');

  // State for the contributers for a repo
  const [contributers, setContributers] = useState<Contributer[]>([]);
  // State for the status of loading the contributers
  const [contributersStatus, setContributersStatus] = useState<LoadingStatus>('Pending');

  // State for the README contents, or undefined if there is no README
  const [readme, setReadme] = useState<string | undefined>(undefined);
  // State for the status of loading the README
  const [readmeStatus, setReadmeStatus] = useState<LoadingStatus>('Pending');

  // State for the commits for the repo
  const [commits, setCommits] = useState<Commit[]>([]);
  // State for the status of loading the commits
  const [commitsStatus, setCommitsStatus] = useState<LoadingStatus>('Pending');

  // Load the languages
  useEffect(() => {
    loadData(
      repo.links?.languagesUrl,
      // The callback for the fetched data
      async (fetchRes: any) => {
        // The data from the fetch comes back as a dictionary
        // Map each key (language) to an object with the language name and line count
        return Object.keys(fetchRes).map(language => {
          return {language, lines: fetchRes[language]}
        });
      },
      setLanguages,
      setLanguagesStatus
    );
  }, []);

  // Load the contributers
  useEffect(() => {
    loadData(
      repo.links?.contributersUrl,
      // The callback for the fetched data
      (fetchRes: any) => {
        // The data from the fetch comes back as an object
        // Just keep the important info
        return fetchRes.map((contributer: any) => {
          return {name: contributer.login, url: contributer.html_url}
        })
      },
      setContributers,
      setContributersStatus
    );
  }, []);

  // Load the readme
  useEffect(() => {
    loadData(
      repo.links?.readmeUrl,
      // The callback for the fetched data
      async (fetchRes: any) => {
        // The content is a Base64 Encoded string
        // Use the github API to turn it in to HTML
        return await getMarkdownDisplay(fetchRes.content);
      },
      setReadme,
      setReadmeStatus
    );
  }, []);

  // Load the commits
  useEffect(() => {
    loadData(
      repo.links?.commitsUrl,
      // The callback for the fetched data
      (fetchRes: any) => {
        // The data from the fetch comes back as an object
        // Just keep the important info
        return fetchRes.map((commit: any) => {
          return {
            user: {
              name: commit.commit.committer.name,
              url: commit.committer.html_url
            },
            date: commit.commit.committer.date.split('T')[0],
            message: commit.commit.message,
            url: commit.html_url
          }
        })
      },
      setCommits,
      setCommitsStatus
    );
  }, []);

  return (
    <div className={styles.container}>

      {/* Metadata for the page */}
      <Head>
        <title>{repo.user} - {repo.name}</title>
        <meta name="description" content="Search for a user on github and see info about their repos" />
      </Head>
      
      <main className={styles.main}>

        {/* The name of the repo */}
        <a className={styles.hoverLink} href={repo.url}>
          <h1 className={styles.title}>
            {repo.name}
          </h1>
        </a>

        {/* The user of the repo */}
        <a className={styles.hoverLink} href={"https://github.com/" + repo.user}>
          <h2 className={styles.user}>
            {repo.user}
          </h2>
        </a>

        {/* Display tabs to switch between content */}
        <Tabs
          selected={selectedTab} 
          onChange={(tab: number) => setSelectedTab(tab)} 
          tabNames={['Repo Info', 'README', 'Commits']} />

        {/* The repo info panel */}
        <RepoInfoPanel 
          hidden={selectedTab !== 0} 
          repo={repo} 
          languages={languages} 
          languagesStatus={languagesStatus}
          contributers={contributers} 
          contributersStatus={contributersStatus} />

        {/* The README panel */}
        <READMEPanel 
          hidden={selectedTab !== 1} 
          readme={readme} 
          readmeStatus={readmeStatus} />

        {/* The commits panel */}
        <CommitsPanel 
          hidden={selectedTab !== 2} 
          commits={commits}
          commitsStatus={commitsStatus} />

      </main>

    </div>
  )
}

/**
 * Helper function to load additional data for the repo
 * I extracted this as a helper function because it was the
 * same logic repeated 4 times between languages, contributers,
 * README, and commits. This just parameterizes all the unique parts.
 * @param url The url for the content to load
 * @param callback The callback to do data mapping with the fetch result
 * @param valueSetter The state setter for the value of the content fetched
 * @param statusSetter The state setter for the loading status of the content fetched
 */
function loadData(
  url: string | undefined,
  callback: (fetchRes: any) => Promise<any>, 
  valueSetter: (value: any) => void, 
  statusSetter: (status: LoadingStatus) => void)
{
  // Start by checking if the url is valid
  if (url === undefined) {
    // If not, set the status to failed and end
    statusSetter('Failed');
    return;
  }

  // Fetch the url and jsonify it
  fetch(url).then(res => res.json()
    // Once the data is in json, make the callback to organize the data
    .then(fetchRes => callback(fetchRes)).then(value => {
      // Now that the data is organized the way we want it, set the state
      valueSetter(value);
      // and update the status
      statusSetter('Success');
    })
  )
  .catch(e => {
    // Any exception results in a failed status
    statusSetter('Failed');
  })
}

/**
 * NextJS function to render props on the server before loading the page
 * @param context The context for the page
 * @returns The props for the page
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    const {user, repo} = context.query;
    // Just load the basic repo info, the rest will be loaded once the page appears
    const repoData: Repo = await fetchRepo(user as string, repo as string);
    return {
        props: {
            repo: repoData
        }
    }
}

export default RepoPage;