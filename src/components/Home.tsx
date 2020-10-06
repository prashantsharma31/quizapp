import * as React from 'react';

export const HomeComponent = (props: any) => {
    return (
        <div className="row d-block m-3 align-center">
            <ul className="text-left border border-success">
                <li>Please note each question will be of 20 sec</li>
                <li>You can submit an answer by clicking on "Submit answer"</li>
                <li>You can Skip an answer by clicking on "Skip Question"</li>
                <li>Next button will be enabled once you submit the answer</li>
            </ul>
        </div>
    );
} ;