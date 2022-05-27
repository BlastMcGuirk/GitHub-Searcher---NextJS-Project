import React from 'react';
import { Repo } from '../../types/Repo';
import styles from './RepoCard.module.css'
import Image from 'next/image'
import { LanguagePill } from '../Pill/LanguagePill';

/**
 * Props for the Repo Card
 */
interface RepoCardProps {
    /**
     * General info about the repo
     */
    repo: Repo;
}

/**
 * A FC that renders basic information about a repo in a card
 * @param props The props for the Repo Card
 * @returns A card with basic repo information
 */
export default function RepoCard(props: RepoCardProps) {
    const { repo } = props;
    return (
        // The whole card is a link to the page showing more info about the repo
        <a className={styles.card} href={repo.fullName}>

            {/* The name of the repo */}
            <h1 className={styles.name}>{repo.name}</h1>

            {/* The description of the repo */}
            <p className={styles.description}>{repo.description}</p>

            {/* The main language used in the repo */}
            <LanguagePill language={{language: repo.language, lines: 0}}/>

            {/* The footer of the card with general info */}
            <div className={styles.cardFooter}>

                {/* Publicity of the repo */}
                <div className={styles.publicity}>
                    <Image src="/public.svg" alt="Public" width={24} height={24} />
                    <span>Public</span>
                </div>

                {/* Star count for the repo */}
                <div className={styles.starCount}>
                    <Image src="/star.svg" alt="Stars" width={24} height={24} />
                    <span>{repo.stars}</span>
                </div>

            </div>
            
        </a>
    )
}