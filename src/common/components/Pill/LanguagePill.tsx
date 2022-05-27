import React from 'react'
import { Language } from '../../types/Language';
import { Pill } from './Pill';

/**
 * The props for the Language pill
 */
interface LanguagePillProps {
    /**
     * The language to display
     */
    language: Language;
}

/**
 * A pill that shows a language name with the number of lines in a tooltip
 * @param props The props for the language pill
 * @returns A pill showing the language with a tooltip
 */
export const LanguagePill = (props: LanguagePillProps) => {
    const { language } = props;
    const tooltipText = language.lines === 0 ?
        undefined :
        'Lines: ' + language.lines;
    return (
        <Pill pillText={language.language} tooltipText={tooltipText} />
    )
}