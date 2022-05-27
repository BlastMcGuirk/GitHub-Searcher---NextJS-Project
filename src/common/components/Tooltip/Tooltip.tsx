import React, { useState } from 'react'
import styles from './Tooltip.module.css'

/**
 * Props for the tooltip
 */
interface TooltipProps {
    /**
     * Text to show or undefined to not show anything
     */
    text?: string;
    /**
     * The content to show tooltip for
     */
    children: React.ReactNode;
}

/**
 * Wraps a react component in a tooltip so on hover a tooltip will appear
 * @param props The props for the tooltip
 * @returns The child item wrapped in a tooltip
 */
export const Tooltip = (props: TooltipProps) => {

    const { text, children } = props;

    // State for whether or not the tooltip is active
    const [active, setActive] = useState(false);
    
    return (
        <div
            className={styles.tooltip}
            onMouseEnter={() => setActive(true)} 
            onMouseLeave={() => setActive(false)}
        >
            {children}
            {/* Don't show the tooltip if text is undefined */}
            {active && text && (
                <div className={styles.tooltipText}>
                    {text}
                </div>
            )}
        </div>
    )
}