import React from 'react';
import Image from 'next/image';
import styles from './RepoInfoPanel.module.css';
import { Repo } from '../../types/Repo';
import { Language } from '../../types/Language';
import { Contributer } from '../../types/Contributer';
import { LanguagePill } from '../Pill/LanguagePill';
import { ContributerPill } from '../Pill/ContributerPill';
import { LoadingStatus } from '../../../pages/[user]/[repo]';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { Panel, PanelProps } from './Panel';

/**
 * Props for the Repo Info Panel
 */
interface RepoInfoPanelProps {
    /**
     * Basic info about the repo
     */
    repo: Repo;
    /**
     * The languages used in the repo
     */
    languages: Language[];
    /**
     * The status of loading the repo languages
     */
    languagesStatus: LoadingStatus;
    /**
     * Contributers to the repo
     */
    contributers: Contributer[];
    /**
     * The status of loading the repo contributers
     */
    contributersStatus: LoadingStatus;
}

/**
 * FC for displaying general info about the repo
 * @param props The props for the RepoInfo Panel
 * @returns The Repo Info Panel
 */
export const RepoInfoPanel = (props: PanelProps & RepoInfoPanelProps) => {
    const { 
        hidden, repo, languages, languagesStatus, contributers, contributersStatus 
    } = props;

    return (
        <Panel hidden={hidden}>

            {/* Display publicity of repo and number of stars */}
            <div className={styles.rowDisplay}>

                {/* Publicity */}
                <div className={styles.publicity}>
                    <Image src="/public.svg" alt="Public" width={24} height={24} />
                    <span>Public</span>
                </div>

                {/* Number of stars */}
                <div className={styles.starCount}>
                    <Image src="/star.svg" alt="Stars" width={24} height={24} />
                    <span>{repo.stars}</span>
                </div>

            </div>

            {/* Repo description */}
            <InfoGroup header={"Description"}>
                <p>
                    {repo.description}
                </p>
            </InfoGroup>

            {/* Display these side by side, with wrap enabled for smaller screens */}
            <div className={styles.rowDisplay}>

                {/* Repo Languages */}
                <InfoGroup header={"Languages"} status={languagesStatus} >
                    <div className={styles.pillsContainer}>
                        {languages.map(language => <LanguagePill key={language.language} language={language} />)}
                    </div>
                </InfoGroup>

                {/* Repo Contributers */}
                <InfoGroup header={"Contributers"} status={contributersStatus} >
                    <div className={styles.pillsContainer}>
                        {contributers.map(contributer => <ContributerPill key={contributer.name} contributer={contributer} />)}
                    </div>
                </InfoGroup>

            </div>

        </Panel>
    )
}

/**
 * Props for an InfoGroup
 */
interface InfoGroupProps {
    /**
     * The title for the info group
     */
    header: string;
    /**
     * The content of the info group
     */
    children: React.ReactNode;
    /**
     * The status of loading the content for the info group
     */
    status?: LoadingStatus;
}

/**
 * FC for displaying a similar looking group of data
 * @param props The props for the info group
 * @returns The info group with the content or a loading spinner
 */
const InfoGroup = (props: InfoGroupProps) => {
    return (
        <div className={styles.infoGroup}>
            
            {/* The title of the info group */}
            <h3 className={styles.header}>{props.header}</h3>

            {/* If there's nothing to load (!props.status), show the content */}
            {(!props.status || props.status == 'Success') && props.children}
            {props.status == 'Pending' && <LoadingSpinner />}
            {props.status == 'Failed' && "Failed to load"}

        </div>
    )
}