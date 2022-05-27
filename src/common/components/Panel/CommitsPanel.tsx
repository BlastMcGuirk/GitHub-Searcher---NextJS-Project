import React from 'react';
import styles from './CommitsPanel.module.css';
import { Panel, PanelProps } from './Panel';
import { Commit } from '../../types/Commit';
import { LoadingStatus } from '../../../pages/[user]/[repo]';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

/**
 * Props for the Commits Panel
 */
interface CommitsPanelProps {
    /**
     * The list of Commits
     */
    commits: Commit[];
    /**
     * The status of the commits loading
     */
    commitsStatus: LoadingStatus;
}

/**
 * React FC for the Panel showing the repo's commits
 * @param {PanelProps & CommitsPanelProps} props The props for the FC
 * @returns The panel showing the repo's commit history
 */
export const CommitsPanel = (props: PanelProps & CommitsPanelProps) => {
    const { commits, commitsStatus } = props;
    return (
        <Panel hidden={props.hidden}>
            {commitsStatus === 'Pending' && <LoadingSpinner />}
            {commitsStatus === 'Failed' && "Failed to load"}
            {commitsStatus === 'Success' && (
                <div className={styles.list}>
                    {commits.map(commit => <CommitRow key={commit.url} commit={commit}/>)}
                </div>
            )}
        </Panel>
    )
}

/**
 * The props for a single commit row displayed in the panel
 */
interface CommitRowProps {
    /**
     * Info about the commit
     */
    commit: Commit;
}

/**
 * React FC for showing a single commit in the panel
 * @param props The props for the commit row
 * @returns A box showing the commit with a link to the github page
 */
const CommitRow = (props: CommitRowProps) => {
    const { commit } = props;
    return (
        // Wrap the whole thing in a link
        <a href={commit.url}>

            {/* Create the row as a box */}
            <div className={styles.commitRow}>
                
                {/* The commit message */}
                <h1 className={styles.header}>
                    {commit.message}
                </h1>

                {/* The commit info */}
                <div className={styles.subHeader}>
                    <p>{commit.user.name}</p>
                    <p>Commited on {commit.date}</p>
                </div>
            </div>

        </a>
    )
}