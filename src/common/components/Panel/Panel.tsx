import React from 'react'
import styles from './Panel.module.css';

/**
 * Props for the panel
 */
export interface PanelProps {
    /**
     * The React child if there is one
     * Note: To save on creating a duplicate interface, this is
     *  optional so it can be used by the Panel children, even
     *  though they are not called with children.
     */
    children?: React.ReactNode;
    /**
     * Whether or not the panel is hidden
     */
    hidden: boolean;
}

/**
 * A Panel is a wrapper for displaying a page of data in the repo page
 * @param props The props for the panel
 * @returns A panel wrapping a child object
 */
export const Panel = (props: PanelProps) => {
    if (props.hidden) return null;
    return (
        <div className={styles.panel}>
            {props.children}
        </div>
    )
}