import * as React from 'react';

export const HeaderComponent = (props: any) => {
    return (
    <h2 className="mt-2"><u>{props.header}
        </u></h2>
    );
} ;