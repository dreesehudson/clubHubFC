import React from 'react';


export function mapOverParagraphs(array, className) {
    return array.map((paragraph, index) => {
        return <p key={index} className={className}>{paragraph}</p>
    })
}

export function mapOverATags(array, className) {
    return array.map((paragraph, index) => {
        return <a key={index} href={'url'} className={className}>{paragraph}</a>
    })
}