import React from 'react';

export const PostImage = ({ alt, src, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img alt={alt} src={src} loading="lazy" {...rest} />;
};

