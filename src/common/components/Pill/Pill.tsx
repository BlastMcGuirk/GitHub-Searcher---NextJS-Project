import React from 'react'
import { Tooltip } from '../Tooltip/Tooltip';
import styles from './Pill.module.css';

/**
 * Props for the Pill component
 */
interface PillProps {
    /**
     * The text for the inside of the pill
     */
    pillText: string;
    /**
     * The text for the tooltip or undefined if no tooltip
     * should appear for the pill
     */
    tooltipText?: string;
}

/**
 * A pill that displays some info with an optional tooltip
 * @param props The props for the pill
 * @returns A pill that displays some info with an optional tooltip
 */
export const Pill = (props: PillProps) => {
    const { pillText, tooltipText } = props;
    return (
        // Undefined text makes the tooltip not appear
        <Tooltip text={tooltipText}>
            <div className={styles.pill}>
                <p>{pillText}</p>
            </div>
        </Tooltip>
    )
}