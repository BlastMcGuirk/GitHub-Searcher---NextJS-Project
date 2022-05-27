import React from 'react'
import styles from './Pill.module.css';
import Tooltip from '@mui/material/Tooltip';

interface PillProps {
    pillText: string;
    tooltipTitle?: string;
}

/**
 * A pill that displays some info with an optional tooltip
 * @param props The props for the pill
 * @returns A pill that displays some info with an optional tooltip
 */
export const Pill = (props: PillProps) => {
    const { pillText, tooltipTitle } = props;
    return (
        // Blank titles make the tooltip not show up
        <Tooltip title={tooltipTitle ?? ''} arrow>
            <div className={styles.pill}>
                <p>{pillText}</p>
            </div>
        </Tooltip>
    )
}