import React from 'react'
import { Contributer } from '../../types/Contributer'
import { Pill } from './Pill'

/**
 * Props for the Contributer Pill
 */
interface ContributerPillProps {
    /**
     * The contributer to display
     */
    contributer: Contributer;
}

/**
 * A pill that displays a name and a link to the account on github
 * @param props Props for the Contributer Pill
 * @returns A pill with a link to the contributer
 */
export const ContributerPill = (props: ContributerPillProps) => {
    const { contributer } = props;
    return (
        // Wrap the pill in a link
        <a href={contributer.url}>
            <Pill pillText={contributer.name} />
        </a>
    )
}