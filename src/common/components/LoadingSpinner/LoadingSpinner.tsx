import React from 'react'
import styles from './LoadingSpinner.module.css'

/**
 * React FC for a loading spinner bar
 * @returns Loading Spinner element
 */
export const LoadingSpinner = () => {
    return (
        <div className={styles.loadingSpinner}></div>
    )
}