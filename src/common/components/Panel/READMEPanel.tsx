import React from 'react';
import { Panel, PanelProps } from './Panel';
import { LoadingStatus } from '../../../pages/[user]/[repo]';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

/**
 * Props for the README Panel
 */
interface READMEPanelProps {
    /**
     * The README in HTML, or undefined if there is no readme for the repo
     */
    readme?: string;
    /**
     * The status of loading the README
     */
    readmeStatus: LoadingStatus;
}

/**
 * React FC for rendering out the README in a panel
 * @param props The props for the README panel
 * @returns The README panel
 */
export const READMEPanel = (props: PanelProps & READMEPanelProps) => {
    const { hidden, readme, readmeStatus } = props;
    return (
        <Panel hidden={hidden}>
            {readmeStatus === 'Pending' && <LoadingSpinner />}
            {readmeStatus === 'Failed' && "Failed to load"}
            {readmeStatus === 'Success' && <div dangerouslySetInnerHTML={{ __html: readme! }}></div>}
        </Panel>
    )
}