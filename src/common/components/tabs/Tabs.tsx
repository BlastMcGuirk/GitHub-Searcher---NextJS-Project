import React, { Children, useState } from 'react'
import styles from './Tabs.module.css';

/**
 * Props for the tabs component
 */
interface TabsProps {
    /**
     * The index of the selected tab
     */
    selected: number;
    /**
     * The names of the tabs
     */
    tabNames: string[];
    /**
     * Callback for when a new tab is clicked
     */
    onChange: (index: number) => void;
}

/**
 * FC for displaying a list of tabs
 * @param props Props for the tabs
 * @returns A list of tabs
 */
export const Tabs = (props: TabsProps) => {
    const { selected, tabNames, onChange } = props;
    return (
        // Container for the tabs
        <div className={styles.tabs}>

            {/* Map the tab names to tabs */}
            {tabNames.map((tabName: string, index: number) => {
                return (
                    <div 
                        // If the selected is the same as the current tab index, it's active
                        className={selected === index ? styles.active : styles.tab}
                        onClick={(e) => onChange(index)}
                        key={tabName}
                    >
                        {tabName}
                    </div>
                )
            })}

        </div>
    )
}