import * as React from 'react';

export const HomeComponent = (props: any) => {
    return (
        <div className="rowp-3">
            <ul className="text-left">
                <li>Please note each question will be of 20 sec</li>
                <li>You can submit an answer by clicking on "Submit answer"</li>
                <li>You can Skip an answer by clicking on "Skip Question"</li>
                <li>You can use Previous or Next to revisit any question and update the answer</li>
            </ul>
        </div>
    );
} ;